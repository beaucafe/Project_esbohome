import { Injectable, ServiceUnavailableException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import PoolService from 'src/utilities/mssql/pool.service'
import { IConfig } from 'src/types/mssql/config'
import { PosNumber, IRESPONSE } from 'src/types/pos/pos.type'
import {
  IPoscontrol,
  IPaymentType,
  IPOSDatax,
  IPOSDetails,
  IPOSDATA,
  IPOSDATARUNNING,
  IPOS,
} from 'src/models/pos/posdata.interface'
import { IYYMMDD, ISETTIME } from 'src/libs/datetostring/date.type'
import { dataClass } from './data.class'
import * as strqry from './data.querystring'
import { StringDate } from 'src/libs/datetostring/date.class'

@Injectable()
export class DataDaily {
  //   private posdata = new dataClass()
  constructor(
    @InjectModel('Poscontroller') private poscontrolModel: Model<IPoscontrol>,
    @InjectModel('PaymentType') private paymentTypeModel: Model<IPaymentType>,
    @InjectModel('Posdatax') private posdataxModel: Model<IPOSDatax>,
    @InjectModel('Posdata') private posdataModel: Model<IPOSDATA>,
    @InjectModel('Posdatarunning') private runningModel: Model<IPOSDATARUNNING>,

    private _posdate: dataClass,
  ) {}

  async dailytest(posname, setTime?: ISETTIME) {
    // if (setTime === undefined) console.log('start : undefined')
    const posdata = this._posdate
    let posID = posdata.PosID(posname)
    const strDate = new StringDate()
    const { day, month, year } = strDate
    const FirstOfMonth = Number(day) - Number(day) + 1
    console.log(setTime)

    const mStartDate =
      setTime !== undefined
        ? {
            day: setTime.start.day,
            month: setTime.start.month,
            year: setTime.start.year,
          }
        : { day: strDate.day, month: strDate.month, year: strDate.year }

    console.log(mStartDate)

    const mStopDate =
      setTime !== undefined
        ? {
            day: setTime.stop.day,
            month: setTime.stop.month,
            year: setTime.stop.year,
          }
        : { day: strDate.day, month: strDate.month, year: strDate.year }

    console.log(mStopDate)

    const result: IRESPONSE[] = []

    let setTimeRun: IYYMMDD

    try {
      let setIndex = 0

      if (mStartDate.month !== mStopDate.month)
        throw new Error('Month error: ข้อมูลต้องเป็นเดือนเดียวกัน!')

      for (let i = Number(mStartDate.day); i <= Number(mStopDate.day); i++) {
        // setTimeout(() => {
        setTimeRun = {
          day: i,
          month: mStartDate.month,
          year: mStartDate.year,
        }
        console.log(`Run time : ${JSON.stringify(setTimeRun)}`)

        result[setIndex] = await posdata.initialDailyRunning(
          posname,
          setTimeRun,
        )
        setIndex++
        // }, 3000)
      }

      return result
    } catch (error) {
      return new ServiceUnavailableException(error.message)
    }
  }

  async test() {
    try {
      return { message: 'test' }
    } catch (error) {
      throw new ServiceUnavailableException(error.message)
    }
  }

  async PosdataByPosName_Daily_V2(PosName) {
    // ok ,  select by pos
    //PosdataByPosName_Daily version 2
    let posName = PosName
    let posID = this._posdate.PosID(posName)
    let { day, month, year } = this._posdate.date
    let getMonthly = `${year}${month}` //  return this's current month
    let getDaily = `${year}${month}${day}` // return this's current date  [yymmdd]

    try {
      // const updated = await this.PosdataByPosName_Daily_V1(posName)
      // console.log(updated)
      // bug#1 , first time create collection
      // bug#2 , การ delay ของข้อมูลเนื่องจากเรียก Async function
      // Edit ,  โดยการแจ้ง function PosdataByPosName_Daily_V1 ออกไปก่อน
      const mongodb = await this.posdataxModel.aggregate([
        { $match: { MonthlyRunning: getMonthly } },
        { $unwind: { path: '$POINTOFSALE' } },
        {
          $match: {
            'POINTOFSALE.POSID': { $eq: posID },
          },
        },
        { $unwind: '$POINTOFSALE.DailyRunning' },
        {
          $match: {
            'POINTOFSALE.DailyRunning.DateAt': { $eq: getDaily },
          },
        },
        // { $unwind: '$POINTOFSALE.DailyRunning.DateAt' },
        { $project: { 'POINTOFSALE.DailyRunning': 1, _id: 0 } },
      ])

      const { POINTOFSALE } = mongodb[0]

      const { POSDetails } = POINTOFSALE.DailyRunning
      let taxTotal = 0.0
      let preTax = 0.0
      let TaxAmount = 0.0
      let billCancels = 0
      let billMember = 0
      let billTotal = 0
      // billStatus = {2:ยกเลิก}
      // billCharge = ติดลบ = คืนเงิน
      for (let i = 0; i < POSDetails.length; i++) {
        const {
          billCharge,
          billSV,
          billVat,
          billMbcard,
          billMbcode,
          billType,
          billStatus,
        } = POSDetails[i]

        if (billType === 1 && billStatus === 0) {
          // taxTotal += parseFloat(billCharge.toFixed(2))
          preTax = preTax + parseFloat(billSV.toFixed(2))
          TaxAmount = TaxAmount + parseFloat(billVat.toFixed(2))
          taxTotal = preTax + TaxAmount
          billTotal++
        }

        ;(billMbcard !== '' && billMbcode !== '') || (billMbcard && billMbcode)
          ? billMember++
          : billMember

        // if (billStatus === 2) billCancel++
        billStatus === 2 ? billCancels++ : billCancels
      }

      // console.log(preTax)
      const result = {
        SalesTaxTotal: parseFloat(taxTotal.toFixed(2)),
        SalesPreTax: parseFloat(preTax.toFixed(2)),
        taxAmount: parseFloat(TaxAmount.toFixed(2)),
        billSalesTotal: billTotal,
        billMembers: billMember,
        billCancel: billCancels,
      }

      return result
    } catch (error) {
      throw new ServiceUnavailableException(error.message)
    }
  }
}
