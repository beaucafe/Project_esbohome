import {
  IPOSDatax,
  IPOSDetails,
  ITablename,
  IPOSDATA,
  IPOSDATARUNNING,
  IPOS,
  IoptionYMD,
} from 'src/models/pos/posdata.interface'
import { IYYMMDD } from 'src/libs/datetostring/date.type'
import { PosNumber, IRESPONSE } from 'src/types/pos/pos.type'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Injectable, ServiceUnavailableException } from '@nestjs/common'
import PoolService from 'src/utilities/mssql/pool.service'
import * as strquery from './data.querystring'
import { StringDate } from 'src/libs/datetostring/date.class'

export class dataClass {
  private _yymmdd: IYYMMDD = {
    day: new Date().getDate(),
    month: new Date().getMonth() < 12 ? new Date().getMonth() + 1 : 1,
    year: new Date().getFullYear(),
  }

  //#region  POS find tablename
  private _tableNameByPos = (start?: number | string, stop?: string) => {
    try {
      let error = null
      let { day, month, year } = this.date
      let where = `where POSC_FM_DATE= '${year}-${month}-${day}'`
      if (typeof start == 'number') {
        start = start < 0 ? start : start * -1
        where = `where POSC_FM_DATE= '${year}-${month}-${Number(day) + start}'`
      } else {
        if (start && !(stop === '' || stop)) {
          // console.log(start + ' / ' + ' ! ' + stop)
          where = `where POSC_FM_DATE = ${start}`
        } else if (start && stop) {
          let dstr = start.split('-').join('')
          let dsto = stop.split('-').join('')
          if (dstr > dsto) {
            // console.log(dateStart + '/' + dateStop)
            error = `Invalid date, Start [${start}] must be less than, Stop [${stop}], Or leave blank `
            throw new Error(error)
          } else where = `where POSC_FM_DATE between ${start} and ${stop}`
        } else {
          if (start === '' || stop === '') {
            error = `Invalid date, Start [${start}] or Stop [${stop}], Or leave blank `
            throw new Error(error)
          }
        }
      }

      let query = `SELECT TOP 1 POSC_FM_DATE as Datetime
              ,POSC_TABLE as Tablename
              ,POSC_POS as PosID
              ,POS1_NAME as PosName
              FROM POSCONTROL JOIN POSCONFIG1 ON POS1_KEY = POSC_POS
              ${where}
              order by posc_key asc`

      return query
    } catch (error) {
      return { error: error.message }
    }
  }
  //#endregion

  //#region DailyRun and MonthlyRun   output =  string / monthly = '202007' and daily = '20200701'
  private _monthlyRun = `${
    this._yymmdd.year
  }${this._yymmdd.month.toString().padStart(2, '0')}`

  private _dailyRun = `${
    this._yymmdd.year
  }${this._yymmdd.month
    .toString()
    .padStart(2, '0')}${this._yymmdd.day.toString().padStart(2, '0')}`

  //#endregion

  //#region  POSID
  private _PosID = (PosName: string) => {
    let posName = PosName.toLowerCase()
    switch (posName) {
      case 'pos1':
        return PosNumber.pos1
        break
      case 'pos2':
        return PosNumber.pos2
        break
      case 'pos3':
        return PosNumber.pos3
        break
      case 'pos4':
        return PosNumber.pos4
        break
      case 'pos5':
        return PosNumber.pos5
        break
      case 'pos6':
        return PosNumber.pos6
        break
      default:
        throw new Error(`พบข้อผิดพลาด : PosName [${PosName}] : ไม่ถูกต้อง`)
    }
  }
  //#endregion

  // TODO database posdate
  dataCheckDailyRunning = async (posID) => {
    try {
      const mongodb = await this.dataModel.aggregate([
        { $match: { MonthlyRunning: '202007' } },
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
            createdAt: 0,
            updatedAt: 0,
          },
        },
      ])

      //   for(let i=0;i< mongodb.length; i++)
      if (!mongodb || !mongodb[0])
        throw new Error(`dataCheckDailyRunning : ไม่พบข้อมูล!`)

      const datarunning = mongodb.map((data) => {
        const { POSID, DailyRunning } = data.POINTOFSALE
        const { _id, DateAt } = DailyRunning

        return { Tablename: _id, DateAt }
      })

      return datarunning
    } catch (error) {
      return error.message
    }
  }

  // TODO end

  // TODO  mssql query
  //#region initail Month
  // เพื่อสร้าง  Collection ให้ตรงกับ  เดือนปีปัจจุบัน
  private _initMonthDB = async (month: string) => {
    const db = await this.posdataModel
      .findOne({ Monthly: month })
      .select({ _id: 1, Monthly: 1, dailyRunning: 1 })

    let result: any = { status: 200, db }
    if (!db || db.length < 1) {
      let createdb = new this.posdataModel({
        Monthly: month,
      })
      result = await createdb
        .save()
        .then((db) => {
          return {
            status: 201,
            message: 'saved, successfully.',
            created: month,
            db,
          }
        })
        .catch((error) => {
          return { status: 404, message: error.message }
        })
    }

    return result
  }
  get initMonthDB() {
    return this._initMonthDB
  }
  set initMonthDB(value) {
    this._initMonthDB = value
  }

  //#endregion

  //#region c
  public get updateDayAndMonth() {
    return this._updateDailyMonthly
  }
  public set updateDayAndMonth(value) {
    this._updateDailyMonthly = value
  }

  private _updateDailyMonthly = (saveDB, monthlyDB) => {
    // console.log('day : ' + saveDB.dailyRunning)
    try {
      let msg = ''
      const { dailyRunning } = monthlyDB
      let st_id = String(saveDB._id)
      let st_date = String(saveDB.dailyRunning)

      let found = dailyRunning.filter(
        (data) => data.date === saveDB.dailyRunning,
      )
      outerloop: if (!found[0] || found.length < 1) {
        dailyRunning.push({
          _id: saveDB._id,
          date: saveDB.dailyRunning,
        })
        msg = ` and New collection [Monthly] Created.`
        monthlyDB.save()
      } else {
        const { _id, date } = dailyRunning[0]
        let cID = String(_id)
        let cDate = String(date)
        if (
          st_id.localeCompare(cID) === 1 &&
          st_date.localeCompare(cDate) === 0
        ) {
          dailyRunning[0]._id = saveDB._id
          msg = ` and Collection [Monthly] Updated.`
          monthlyDB.save()
        } else msg = ' Month already.'
      }
      return msg
    } catch (error) {
      return `, And Error : ${error.message}`
    }
  }
  //#endregion

  //#region initail for daily,  By Pos
  private _initialDailyRunning = async (posname, date?: IYYMMDD | Date) => {
    // return Promise
    // let posID = this.PosID(posname)
    // let { day, month, year } = this.date
    const setDate = new StringDate()
    let daily = date ? date : new Date() //{ day: 3, month: 6, year: 2020 }
    let getMonthly = setDate.todateYMD(daily, 'ym') // '202007  // yymm
    let getDaily = setDate.todateYMD(daily, 'yymmdd') //'20200727' //this._dailyRun
    let currentDay = `'${setDate.todateYMD(daily)}'` // 2020-07-01
    // console.log(`daily : ${typeof daily}`)
    // console.log(`input date : ${JSON.stringify(date)}`)
    // console.log(posname)

    let result = {
      status: 200,
      message: `[${getDaily}] พร้อมใช้งาน. : ไม่มีข้อมูลปรับปรุง!`,
      data: {},
    }
    let dataRunning: IPOS
    let posDetail: IPOSDetails[]

    // console.log(strquery)

    try {
      let strquery = this.tableNameByPos(currentDay) // out = string
      // console.log(strquery)

      if (strquery instanceof Object)
        throw new Error(`Query string : ${strquery.error}`)

      const posConnect = new PoolService(posname)
      let query = await posConnect.query(strquery)
      const dataRow = await posConnect.dataRowsAffected(query)
      // console.log(dataRow)

      if (dataRow < 1)
        throw new Error(
          `Pos Tablename : ไม่พบตารางข้อมูลนี้! หรือ เครื่องยังไม่เปิดบริการ`,
        )

      let dataTblName = await posConnect.dataRecordset(query)

      posDetail = await this.dataPosDetail(posConnect, dataTblName[0].Tablename)
      dataRunning = this.dataDailyRun(posDetail, dataTblName[0])
      // console.log(`dataTblName : ${dataTblName[0].Datetime}`)
      // console.log(`datatime : ${setDate.todateYMD(dataTblName[0].Datetime)}`)
      // console.log(
      //   `datatime : ${setDate.todateYMD(dataTblName[0].Datetime, 'yymmdd')}`,
      // )

      result.data = {
        Posname: dataRunning.POSName,
        Tablename: dataRunning.POSTable,
        DateAt: dataRunning.DateAt,
        billRecords: dataRunning.billSalesTotal,
      }
      // console.log(Object.keys(dataRunning.POSDetails).length)

      // console.log(dataRunning)

      // ค้นหาเป้าหมายที่ตรงกับ วันเดือนปี
      const posdataDB = await this.dailyModel
        .findOne({ dailyRunning: getDaily })
        .select({ _id: 1, dailyRunning: 1, POINTOFSALE: 1 })

      // let monthlydb = await this.posdataModel
      //   .findOne({ Monthly: getMonthly })
      //   .select({ _id: 1, Monthly: 1, dailyRunning: 1 })

      // if (!monthlydb || monthlydb.length < 1)
      const monthlydb = await this.initMonthDB(getMonthly)
        .then((data) => data.db)
        .catch((error) => error.message)

      if (!posdataDB || posdataDB.length < 1) {
        // const { dailyRunning } = monthlydb

        let createdb = new this.dailyModel({
          dailyRunning: getDaily,
          POINTOFSALE: dataRunning,
        })
        // บันทึกและ Save ref ลง Posdata
        result = await createdb
          .save()
          .then(() => {
            const msg = this.updateDayAndMonth(createdb, monthlydb)

            return {
              status: 201,
              message: `Created, successfully.${msg}`,
              data: { Date: getDaily, _id: createdb._id },
            }
          })
          .catch((error) => {
            return {
              status: 404,
              message: `Postable failed: ${dataRunning.POSTable}`,
              error: error.message,
            }
          })
      } else {
        //? Collection Daily มีแล้ว  แต่ POS เป้าหมายที่ต้องการเพิ่มข้อมูล
        //* หาเครื่องเป้าหมาย
        // console.log('หาเครื่องเป้าหมาย')

        let cntDetails = Object.keys(dataRunning.POSDetails).length
        const { POINTOFSALE } = posdataDB
        // console.log(POINTOFSALE.length)
        const found = POINTOFSALE.filter(
          (data) => data.POSID === dataRunning.POSID,
        )
        if (!found || found.length < 1) {
          // console.log('if loop lasted')
          //? console.log('ไม่พบข้อมูลให้สร้างขึ้นมาใหม่ !')
          // ไม่สามารถสร้างใหม่ได้  เนื่องจากเป็นตารางข้อมูลระบุเงื่อนไขวันที่เดียวกัน  แต่คนละเครื่องเป้าหมาย จึงต้อง
          // เป็นการอัพเดทข้อมูลของ POINTOSALE อย่างเดียว
          POINTOFSALE.push(dataRunning)
          result = await posdataDB
            .save()
            .then(() => {
              const msg = this.updateDayAndMonth(posdataDB, monthlydb)
              return {
                status: 201,
                message: `Updated, successfully.${msg}`,
                data: {
                  Posname: dataRunning.POSName,
                  Postable: dataRunning.POSTable,
                  RecordRow: cntDetails,
                },
              }
            })
            .catch((error) => {
              return {
                status: 404,
                message: `Postable failed: ${dataRunning.POSTable}`,
                error: error.message,
              }
            })
        } else {
          //console.log('พบข้อมูล ให้ปรับปรุงข้อมูลนี้ !')
          //console.log(Object.keys(dataRunning.POSDetails))
          // console.log('else loop lasted')

          let dif = 0
          for (let i = 0; i < POINTOFSALE.length; i++) {
            const { POSDetails, POSID } = POINTOFSALE[i]
            dif = Number(cntDetails) - Number(POSDetails.length)
            if (POSID === dataRunning.POSID && POSDetails.length < cntDetails) {
              POINTOFSALE[i] = dataRunning
              result = await posdataDB
                .save()
                .then(() => {
                  return {
                    status: 201,
                    message: 'Updated, successfully.',
                    data: {
                      Posname: dataRunning.POSName,
                      Postable: dataRunning.POSTable,
                      RecordRow: dif,
                    },
                  }
                })
                .catch((error) => {
                  return { status: 404, message: error.message }
                })
              break
            }
          }
        }
      }
      return result
    } catch (error) {
      return {
        status: 503,
        message: error.message,
        data: error,
      }
      //return new ServiceUnavailableException(error.message)
    }
  }
  //#endregion

  dataDailyRun = (posDetail, posTable: ITablename): IPOS => {
    let taxTotal = 0.0
    let preTax = 0.0
    let TaxAmount = 0.0
    let billCancels = 0
    let billMember = 0
    let billTotal = 0

    let result: IPOS
    const { Datetime, Tablename, PosID, PosName } = posTable

    const dateAt = new StringDate().todateYMD(Datetime, 'yymmdd')

    const id = Tablename

    for (let i = 0; i < posDetail.length; i++) {
      const {
        billCharge,
        billSV,
        billVat,
        billMbcard,
        billMbcode,
        billType,
        billStatus,
      } = posDetail[i]

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

    result = {
      POSTable: id,
      DateAt: dateAt,
      POSID: PosID,
      POSName: PosName,
      salesTaxTotal: parseFloat(taxTotal.toFixed(2)),
      salesPreTax: parseFloat(preTax.toFixed(2)),
      taxAmount: parseFloat(TaxAmount.toFixed(2)),
      billSalesTotal: billTotal,
      billMembers: billMember,
      billCancel: billCancels,
      POSDetails: posDetail,
    }

    // console.log(result)

    return result
  }

  dataPosDetail = async (connect, tableName) => {
    // console.log(typeof tableName)

    let detailPromise: IPOSDetails[]
    if (tableName instanceof Object) {
      // console.log('Multi tables ' + tableName)
      detailPromise = tableName.map(async (data) => {
        const result: IPOSDetails[] = await this.mergePosDetail(
          connect,
          data.Tablename,
        )
        return await result
      })
    } else {
      // console.log('Single table ' + tableName)

      detailPromise = await this.mergePosDetail(connect, tableName)
      //return detailPromise
    }

    return detailPromise
  }

  mergePosDetail = async (connect, tblposName) => {
    try {
      //const mssql = new PoolService(posName)
      let query = await connect.query(strquery.POSDetails(tblposName))
      const dataRow = await connect.dataRowsAffected(query)
      if (dataRow < 1) throw new Error(`ไม่มีข้อมูลสำหรับอัพเดท!!`)

      const posDetails = await connect.dataRecordset(query)

      query = await connect.query(strquery.BillDetail(tblposName))
      const billRows = await connect.dataRowsAffected(query)

      if (billRows < 1) throw new Error(`ไม่พบข้อมูลการขาย!!`)

      const billData = await connect.dataRecordset(query)
      // Merge  ระหว่าง  PosDetail กับ BillDetail
      let PosBillDetails = posDetails.map((data) => {
        let detail: IPOSDetails[]
        let bill = billData.filter((bill) => {
          if (bill.billID_ref === data._id) return bill
        })
        detail = { ...data, billDeatil: bill }
        return detail
      })

      return PosBillDetails
    } catch (error) {
      return error.message
    }
  }
  //#endregion
  // TODO end

  constructor(
    @InjectModel('Posdatax') private dataModel: Model<IPOSDatax>,
    @InjectModel('Posdata') private posdataModel: Model<IPOSDATA>,
    @InjectModel('Posdatarunning') private dailyModel: Model<IPOSDATARUNNING>,
  ) {}

  get date(): IYYMMDD {
    return this._yymmdd
  }

  set date(value) {
    this.date = value
  }

  get PosID() {
    return this._PosID
  }
  set PosID(value) {
    this.PosID = value
  }

  public get tableNameByPos() {
    return this._tableNameByPos
  }
  public set tableNameByPos(value) {
    this._tableNameByPos = value
  }

  public get monthly() {
    return this._monthlyRun
  }
  public get daily() {
    return this._dailyRun
  }

  public get initialDailyRunning() {
    return this._initialDailyRunning
  }

  public set initialDailyRunning(value) {
    this._initialDailyRunning = value
  }
}
