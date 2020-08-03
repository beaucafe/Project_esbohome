import { Injectable, ServiceUnavailableException } from '@nestjs/common'
import {
  defaultConfig,
  POS1Config,
  POS2Config,
  POS3Config,
  POS4Config,
} from 'src/config/db.config'
import {
  IPoscontrol,
  IPaymentType,
  IPOSDatax,
  IBilldetail,
  IPOSDetails,
} from 'src/models/pos/posdata.interface'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import PoolService from 'src/utilities/mssql/pool.service'
import { IResponse } from 'src/types/pos/response.interface'
import * as strquery from './data.querystring'
import {
  ResponseStatus,
  ResponsePromiseStatus,
} from 'src/utilities/change.status'
import { DataRepository } from './data.repository'

interface ISummaryByPOS {
  mSalesTotal: number
  mSalesPreTaxTotal: number
  mSalesTaxAmountTotal: number
  mBill_salesTotal: number
  mBill_memberTotal: number
  mBill_cancelTotal: number
}

@Injectable()
export class DataMonthly {
  constructor(
    @InjectModel('Posdatax') private posdataModel: Model<IPOSDatax>,
    private db: DataRepository,
  ) {}

  async getSumMonth(posname) {
    try {
      let posName = posname
      let posID = this.db.PosID(posName)
      let getMonthly = strquery.monthlyRunning //  return this's current month
      let getDaily = strquery.dailyRunning // return this's current date  [yymmdd]

      let result: ISummaryByPOS = {
        mSalesTotal: 0,
        mSalesPreTaxTotal: 0,
        mSalesTaxAmountTotal: 0,
        mBill_salesTotal: 0,
        mBill_memberTotal: 0,
        mBill_cancelTotal: 0,
      }

      const mongodb = await this.posdataModel.aggregate([
        { $match: { MonthlyRunning: getMonthly } },
        { $unwind: { path: '$POINTOFSALE' } },
        {
          $match: {
            'POINTOFSALE.POSID': { $eq: posID },
          },
        },
        { $unwind: '$POINTOFSALE.DailyRunning' },

        {
          $project: {
            MonthlyRunning: 0,
            'POINTOFSALE.DailyRunning': {
              POSDetails: 0,
            },
            _id: 0,
          },
        },
      ])
      const sumMonth = mongodb.map((data) => {
        const { DailyRunning } = data.POINTOFSALE
        return DailyRunning
      })

      for (let i = 0; i < sumMonth.length; i++) {
        result.mSalesTotal += sumMonth[i].salesTaxTotal
          ? sumMonth[i].salesTaxTotal
          : 0
        result.mSalesPreTaxTotal += sumMonth[i].salesPreTax
          ? sumMonth[i].salesPreTax
          : 0
        result.mSalesTaxAmountTotal += sumMonth[i].taxAmount
          ? sumMonth[i].taxAmount
          : 0
        result.mBill_salesTotal += sumMonth[i].billSalesTotal
          ? sumMonth[i].billSalesTotal
          : 0
        result.mBill_memberTotal += sumMonth[i].billMembers
          ? sumMonth[i].billMembers
          : 0
        result.mBill_cancelTotal += sumMonth[i].billCancel
          ? sumMonth[i].billCancel
          : 0
      }

      return result
    } catch (error) {
      throw new ServiceUnavailableException(error.message)
    }
  }
}
