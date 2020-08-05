import { Injectable, ServiceUnavailableException } from '@nestjs/common'
import { defaultResponse } from 'src/types/pos/default.response'
import {
  defaultConfig,
  POS1Config,
  POS2Config,
  POS3Config,
  POS4Config,
} from 'src/config/db.config'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import PoolService from 'src/utilities/mssql/pool.service'
import { IResponse } from 'src/types/pos/response.interface'
// import * as strquery from './data.querystring'
import * as strquery from '../queries'
import {
  IPoscontrol,
  IPaymentType,
  IBilldetail,
  IPOSDetails,
} from 'src/models/pos/posdata.interface'
import {
  ResponseStatus,
  ResponsePromiseStatus,
} from 'src/utilities/change.status'

import { IConfig } from 'src/types/mssql/config'
import { PosNumber } from 'src/types/pos/pos.type'
import { dataClass } from './data.class'

// นิยามเป็นตัวเชื่อมฐานข้อมูล

@Injectable()
export class DataRepository {
  private result: IResponse
  // private mssql: any
  // private config = defaultConfig()
  // private PoolName = 'default'

  constructor(
    @InjectModel('Poscontroller') private poscontrolModel: Model<IPoscontrol>,
    @InjectModel('PaymentType') private paymentTypeModel: Model<IPaymentType>,
    private _dataClass: dataClass,
  ) {
    this.result = new defaultResponse()
  }

  Hello = () => 'Update data!!!.'

  // async Poscontrol() {
  //   try {
  //     const POS1 = new PoolService(POS1Config(), 'POS1')
  //     let query = await POS1.query(strquery.strPoscontrol())
  //     if (!query) throw new Error(` ไม่พบข้อมูล`)
  //     let data = await POS1.dataRecordset(query)
  //     if (!data) throw new Error(` ไม่พบ Recordset`)
  //     return data
  //   } catch (error) {
  //     console.log(`Error : ${error.message}`)
  //     return error.message
  //   }
  // }
  async test() {
    try {
      // let getMonthly = strquery.monthlyRunning //  return this's current month
      // let getDaily = strquery.dailyRunning // return this's current date  [yymmdd]
      const posdata = this._dataClass
      const date = new Date()
      let day = date.getDate()
      let month = date.getMonth() < 12 ? date.getMonth() + 1 : 1
      let year = date.getFullYear()

      let DoM = `'${year}-${month}-1'`
      let currentDay = `'${year}-${month}-${day}'`

      const squery = posdata.tableNameByPos(DoM, currentDay)

      // console.log(squery)

      const mssql = new PoolService('pos1')
      let query = await mssql.query(squery)
      let tblposName = await mssql.dataRecordset(query)

      return { message: tblposName }
    } catch (error) {}
  }

  // async testData(name: string) {
  //   try {
  //     // update  summary  daily
  //     let posName = name.toUpperCase()
  //     let posID = this.PosID(posName)
  //     let getMonthly = strquery.monthlyRunning //  return this's current month
  //     let getDaily = strquery.dailyRunning // return this's current date  [yymmdd]
  //     let messages = `ไม่มีข้อมูล! ที่ต้องปรับปรุง`
  //     const tblPosname = await this.gettblPosName(posName)
  //     const DataDaily = await this.PosdataByPosName_Daily_V2(posName) // ดึงข้อมูลการขายของวันปัจจุบัน

  //     if (!DataDaily) throw new Error(`Data daily has error : ${Error}`)

  //     const mongodb = await this.posdataModel
  //       .findOneAndUpdate({ MonthlyRunning: getMonthly })
  //       .select({ POINTOFSALE: 1 })
  //     // console.log(mongodb)

  //     //เลือก Pos เป้าหมาย
  //     const pos = mongodb.POINTOFSALE.filter((pos) => pos.POSID === posID).map(
  //       (daily) => daily.DailyRunning,
  //     )

  //     const posDaily = pos[0].filter((data) => {
  //       if (data.DateAt === getDaily) return data
  //     })

  //     const {
  //       _id, // table pos
  //       DateAt,
  //       SalesTaxTotal,
  //       billSalesTotal,
  //     } = posDaily[0]

  //     if (DateAt !== getDaily || _id !== tblPosname) {
  //       // console.log(`_id : ${_id}  / tblPosname : ${tblPosname}`)
  //       throw new Error('ข้อมูลเครื่อง POS ไม่ถูกต้อง!')
  //     }

  //     if (
  //       SalesTaxTotal != DataDaily.SalesTaxTotal &&
  //       billSalesTotal != DataDaily.billSalesTotal
  //     ) {
  //       posDaily[0].set({
  //         salesTaxTotal: DataDaily.SalesTaxTotal,
  //         salesPreTax: DataDaily.SalesPreTax,
  //         taxAmount: DataDaily.taxAmount,
  //         billSalesTotal: DataDaily.billSalesTotal,
  //         billMembers: DataDaily.billMembers,
  //         billCancel: DataDaily.billCancel,
  //       })
  //       messages = mongodb.save()
  //         ? 'บันทึกการเปลี่ยนแปลงนี้แล้ว ok.'
  //         : 'เกิดข้อผิดพลาดในระหว่างการบันทึกข้อมูล!'
  //     }

  //     return { message: `[${posName}] : ${messages}` }
  //   } catch (error) {
  //     throw new ServiceUnavailableException(error.message)
  //   }
  // }

  // async PosdataByPosName_Daily_V2(PosName) {
  //   // ok ,  select by pos
  //   //PosdataByPosName_Daily version 2
  //   let posName = PosName
  //   let posID = this.PosID(posName)
  //   let getMonthly = strquery.monthlyRunning //  return this's current month
  //   let getDaily = strquery.dailyRunning // return this's current date  [yymmdd]

  //   try {
  //     // const updated = await this.PosdataByPosName_Daily_V1(posName)
  //     // console.log(updated)
  //     // bug#1 , first time create collection
  //     // bug#2 , การ delay ของข้อมูลเนื่องจากเรียก Async function
  //     // Edit ,  โดยการแจ้ง function PosdataByPosName_Daily_V1 ออกไปก่อน
  //     const mongodb = await this.posdataModel.aggregate([
  //       { $match: { MonthlyRunning: getMonthly } },
  //       { $unwind: { path: '$POINTOFSALE' } },
  //       {
  //         $match: {
  //           'POINTOFSALE.POSID': { $eq: posID },
  //         },
  //       },
  //       { $unwind: '$POINTOFSALE.DailyRunning' },
  //       {
  //         $match: {
  //           'POINTOFSALE.DailyRunning.DateAt': { $eq: getDaily },
  //         },
  //       },
  //       // { $unwind: '$POINTOFSALE.DailyRunning.DateAt' },
  //       { $project: { 'POINTOFSALE.DailyRunning': 1, _id: 0 } },
  //     ])

  //     const { POINTOFSALE } = mongodb[0]

  //     const { POSDetails } = POINTOFSALE.DailyRunning
  //     let taxTotal = 0.0
  //     let preTax = 0.0
  //     let TaxAmount = 0.0
  //     let billCancels = 0
  //     let billMember = 0
  //     let billTotal = 0
  //     // billStatus = {2:ยกเลิก}
  //     // billCharge = ติดลบ = คืนเงิน
  //     for (let i = 0; i < POSDetails.length; i++) {
  //       const {
  //         billCharge,
  //         billSV,
  //         billVat,
  //         billMbcard,
  //         billMbcode,
  //         billType,
  //         billStatus,
  //       } = POSDetails[i]

  //       if (billType === 1 && billStatus === 0) {
  //         // taxTotal += parseFloat(billCharge.toFixed(2))
  //         preTax = preTax + parseFloat(billSV.toFixed(2))
  //         TaxAmount = TaxAmount + parseFloat(billVat.toFixed(2))
  //         taxTotal = preTax + TaxAmount
  //         billTotal++
  //       }

  //       ;(billMbcard !== '' && billMbcode !== '') || (billMbcard && billMbcode)
  //         ? billMember++
  //         : billMember

  //       // if (billStatus === 2) billCancel++
  //       billStatus === 2 ? billCancels++ : billCancels
  //     }

  //     // console.log(preTax)
  //     const result = {
  //       SalesTaxTotal: parseFloat(taxTotal.toFixed(2)),
  //       SalesPreTax: parseFloat(preTax.toFixed(2)),
  //       taxAmount: parseFloat(TaxAmount.toFixed(2)),
  //       billSalesTotal: billTotal,
  //       billMembers: billMember,
  //       billCancel: billCancels,
  //     }

  //     return result
  //   } catch (error) {
  //     throw new ServiceUnavailableException(error.message)
  //   }
  // }

  // async PosdataByPosName_Daily(PosName) {
  //   //  Version 1
  //   try {
  //     let monthlyRunning = strquery.monthlyRunning //  202007
  //     let dailyRunning = strquery.dailyRunning // 20200722
  //     let posname = PosName.toLowerCase()
  //     let posID = this.PosID(posname)
  //     let saveUpdate = false
  //     let saveCreate = false
  //     let response = []
  //     let msg: any

  //     const tblposName = await this.gettblPosName(posname)
  //     // return { monthlyRunning, dailyRunning } //-- ok
  //     const mssql = new PoolService(posname)

  //     // // Note!  ห้ามปรับ  เนื่องจากจะดึงข้อมูล ตารางข้อมูลวันที่ปัจจุบันออกมากเป็น  tblposName
  //     // let query = await mssql.query(strquery.dailyTablePos)
  //     // let tblName = await mssql.dataRecordset(query)

  //     // if (tblName.length < 1)
  //     //   throw new Error('ไม่พบ tableName นี้, หรือเครื่องยังไม่พร้อมขาย!')
  //     // // NOTE! สำคัญ  คือ  ชื่อตารางเก็บข้อมูลในแต่ละวัน
  //     // let tblposName = tblName[0].Tablename
  //     // // console.log(posNumber)
  //     let query = await mssql.query(strquery.POSDetails(tblposName))
  //     const dataRow = await mssql.dataRowsAffected(query)
  //     if (dataRow < 1) throw new Error(`ไม่มีข้อมูลสำหรับอัพเดท!!`)

  //     const posDetails = await mssql.dataRecordset(query)

  //     // const monthlyAlready = await this.initialFirstMonthPosData()

  //     if (!monthlyAlready) throw new Error('ข้อมูลไม่ถูกต้อง')

  //     query = await mssql.query(strquery.BillDetail(tblposName))
  //     const billRows = await mssql.dataRowsAffected(query)

  //     if (billRows < 1) throw new Error(`ไม่พบข้อมูลการขาย!!`)

  //     const billData = await mssql.dataRecordset(query)

  //     // Merge  ระหว่าง  PosDetail กับ BillDetail
  //     let PosBillDetails = posDetails.map((data) => {
  //       let detail: IPOSDetails[]
  //       let bill = billData.filter((bill) => {
  //         if (bill.billID_ref === data._id) return bill
  //       })
  //       detail = { ...data, billDeatil: bill }
  //       return detail
  //     })

  //     // Merge
  //     //////////////////////////////////////////

  //     const Posctrl = await this.poscontrolModel
  //       .findOne({ _id: posID })
  //       .select({ pos_name: 1 })

  //     //const {_id, pos_name} = Posctrl

  //     // connect และ ตรวจสอบข้อมูลใน mongodb
  //     const mongodb = await this.posdataModel.findOne({
  //       MonthlyRunning: monthlyRunning,
  //     })
  //     const { POINTOFSALE } = mongodb
  //     // const { DailyRunning } = POINTOFSALE
  //     // console.log(POINTOFSALE)
  //     if (POINTOFSALE.length < 1) {
  //       // สร้างข้อมูลใหม่ by pos กรณีไม่มีชื่อเครื่อง pos
  //       !PosBillDetails
  //         ? POINTOFSALE.push({
  //             POSID: Posctrl._id,
  //             POSName: Posctrl.pos_name,
  //             DailyRunning: {
  //               _id: tblposName,
  //               DateAt: dailyRunning,
  //             },
  //           })
  //         : POINTOFSALE.push({
  //             POSID: Posctrl._id,
  //             POSName: Posctrl.pos_name,
  //             DailyRunning: {
  //               _id: tblposName,
  //               DateAt: dailyRunning,
  //               POSDetails: PosBillDetails,
  //             },
  //           })
  //       saveCreate = true
  //       msg = !PosBillDetails ? 0 : PosBillDetails.length
  //       response = [
  //         { created: saveCreate, updated: saveUpdate, message: { data: msg } },
  //       ]
  //       // console.log(await mongodb.save())
  //     } else {
  //       // สร้างข้อมูล by pos  กรณีมีหลายของข้อมูลเครื่อง pos
  //       // เลือกเฉพาะ เครื่อง POS เป้าหมาย
  //       const targeted = POINTOFSALE.filter((pos) => {
  //         if (pos.POSID === Posctrl._id && pos.POSName === Posctrl.pos_name)
  //           return pos
  //       })

  //       //  ตรวจสอบเครื่อง pos เป้าหมายมีอยู่หรือไม่ ?
  //       if (targeted.length < 1) {
  //         //  มีทำเงื่อนไขนี้
  //         // เช็คข้อมูลก่อนสร้าง table ใหม่
  //         // console.log('create : ' + chktbl)
  //         !PosBillDetails
  //           ? POINTOFSALE.push({
  //               POSID: Posctrl._id,
  //               POSName: Posctrl.pos_name,
  //               DailyRunning: {
  //                 _id: tblposName,
  //                 DateAt: dailyRunning,
  //               },
  //             })
  //           : POINTOFSALE.push({
  //               POSID: Posctrl._id,
  //               POSName: Posctrl.pos_name,
  //               DailyRunning: {
  //                 _id: tblposName,
  //                 DateAt: dailyRunning,
  //                 POSDetails: PosBillDetails,
  //               },
  //             })
  //         saveCreate = true
  //         msg = !PosBillDetails ? 0 : PosBillDetails.length
  //         response = [
  //           {
  //             created: saveCreate,
  //             updated: saveUpdate,
  //             message: { data: msg },
  //           },
  //         ]
  //       } else {
  //         //  ไม่มีทำเงื่อนไขนี้

  //         const { DailyRunning } = targeted[0]
  //         //  ตรวจสอบ วันที ชื่อตาราง ถูกต้องหรือไม่ ?
  //         const dailyTarget = DailyRunning.filter((daily) => {
  //           if (daily._id === tblposName && daily.DateAt === dailyRunning) {
  //             // console.log('วันนี้')
  //             return daily
  //           }
  //         })
  //         // console.log(dailyTarget.length)

  //         if (dailyTarget.length < 1) {
  //           console.log('สร้างข้อมูลวันนี้')
  //           // วันนี้ไม่ใช่วันที่ และ ตารางไม่ตรงกับข้อมูลปัจจุบัน  ทำเงื่อนไขนี้
  //           DailyRunning.push({
  //             _id: tblposName,
  //             DateAt: dailyRunning,
  //             POSDetails: PosBillDetails,
  //           })
  //           saveCreate = true
  //           response = [{ created: saveCreate, updated: saveUpdate }]
  //         } else {
  //           //  เงื่อนไขการอัพเดทข้อมูล  หากข้อมูลปัจจุบันในฐานข้อมูลไม่ตรงกัน
  //           const { POSDetails } = dailyTarget[0]
  //           // console.log('test')
  //           if (!POSDetails.length && PosBillDetails.length > 0) {
  //             console.log('error loop1')
  //             POSDetails.push(PosBillDetails)
  //             saveCreate = true
  //             response = [{ created: saveCreate, updated: saveUpdate }]
  //           } else if (POSDetails.length <= dataRow) {
  //             // console.log('error loop2' + POSDetails.length)
  //             for (let i = 0; i < dataRow; i++) {
  //               // let pID = POSDetails[i]._id
  //               let pbID = PosBillDetails[i]._id
  //               if (POSDetails[i] && POSDetails[i]._id !== pbID) {
  //                 POSDetails[i] = PosBillDetails[i]
  //                 saveUpdate = true
  //                 response[i] = { created: saveCreate, updated: saveUpdate }
  //               } else if (!POSDetails[i]) {
  //                 // POSDetails.push(PosBillDetails[i])
  //                 POSDetails[i] = PosBillDetails[i]
  //                 saveUpdate = true
  //                 response[i] = { created: saveCreate, updated: saveUpdate }
  //               } else {
  //                 const { billDeatil } = POSDetails[i]
  //                 let detailCnt = billDeatil.length
  //                 let PosBillCnt = PosBillDetails[i].billDeatil.length

  //                 if (detailCnt < PosBillCnt) {
  //                   for (let j = 0; j < PosBillCnt; j++) {
  //                     if (!billDeatil[j]) {
  //                       billDeatil.push(PosBillDetails[i].billDeatil[j])
  //                       saveUpdate = true
  //                       response[j] = {
  //                         created: saveCreate,
  //                         updated: saveUpdate,
  //                       }
  //                     } else {
  //                       if (
  //                         billDeatil[j]._id !==
  //                         PosBillDetails[i].billDeatil[j]._id
  //                       ) {
  //                         billDeatil.push(PosBillDetails[i].billDeatil[j])
  //                         saveUpdate = true
  //                         response[j] = {
  //                           created: saveCreate,
  //                           updated: saveUpdate,
  //                         }
  //                       }
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //     if (saveCreate || saveUpdate) mongodb.save()
  //     return ResponseStatus(response)
  //   } catch (error) {
  //     throw new ServiceUnavailableException(error.message)
  //     // return { error: error.message }
  //   }
  // }
  //#region  ยกเลิกใช้งาน  ใช้ในส่วนของ data.daily.ts แทน
  // initialFirstMonthPosData = async () => {
  //   let monthlyRunning = strquery.monthlyRunning
  //   try {
  //     const mongodb = await this.posdataModel.findOne({
  //       MonthlyRunning: monthlyRunning,
  //     })

  //     if (!mongodb) {
  //       let posData = new this.posdataModel({
  //         MonthlyRunning: monthlyRunning,
  //       })
  //       posData.save()
  //       // console.log(await posData.save())
  //     }
  //     return true
  //   } catch (error) {
  //     return false
  //   }
  // }
  //#endregion

  //#region ยกเลิกใช้งาน ให้เปลี่ยนใช้ในส่วนของ data.class แทน
  async gettblPosName(posname: string) {
    try {
      const posName = posname
      const mssql = new PoolService(posName)
      let query = await mssql.query(strquery.GetTablePosname)
      let tblName = await mssql.dataRecordset(query)

      if (tblName.length < 1)
        throw new Error('ไม่พบ tableName นี้, หรือเครื่องยังไม่พร้อมขาย!')
      // NOTE! สำคัญ  คือ  ชื่อตารางเก็บข้อมูลในแต่ละวัน
      let tblposName = tblName[0].Tablename

      return tblposName
    } catch (error) {
      throw new ServiceUnavailableException(error.message)
    }
  }

  PosID = (PosName) => {
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
      default:
        throw new Error(`พบข้อผิดพลาด : PosName [${PosName}] : ไม่ถูกต้อง`)
    }
  }
  //#endregion

  async Poscontrol(posname) {
    try {
      const objdata = await this.SetupPosControl(posname)
      this.result = await this.NewDataInsertPosControl(objdata)
      return this.result
    } catch (error) {
      throw new Error(error.message)
    }
  }

  // getTablePos = async (posname) => {
  //   let posName = posname.toLowerCase()
  //   try {
  //     switch (posName) {
  //       case 'pos1':
  //         return await this.checkTablePosDaily(POS1Config(), 'POS1')
  //         break
  //       case 'pos2':
  //         return await this.checkTablePosDaily(POS2Config(), 'POS2')
  //         break
  //       case 'pos3':
  //         return await this.checkTablePosDaily(POS3Config(), 'POS3')
  //         break
  //       case 'pos4':
  //         return await this.checkTablePosDaily(POS4Config(), 'POS4')
  //         break
  //       default:
  //         throw new Error(`พบข้อผิดพลาด : posname (${posName}) : ไม่ถูกต้อง`)
  //     }
  //   } catch (error) {
  //     throw new Error(`Data table not found!`)
  //   }
  // }

  SetupPosControl = async (posname) => {
    try {
      let change = posname.toLowerCase()
      let options: string
      switch (change) {
        case 'pos1':
          options = `where POS1_STATION='0001'`
          return await this.BeginSetupPosControl(POS1Config(), 'POS1', options)
          break
        case 'pos2':
          options = `where POS1_STATION='0002'`
          return await this.BeginSetupPosControl(POS2Config(), 'POS2', options)
          break
        case 'pos3':
          options = `where POS1_STATION='0003'`
          return await this.BeginSetupPosControl(POS3Config(), 'POS3', options)
          break
        case 'pos4':
          options = `where POS1_STATION='0004'`
          return await this.BeginSetupPosControl(POS4Config(), 'POS4', options)
          break
        default:
          throw new Error(`พบข้อผิดพลาด : posname (${posname}) : ไม่ถูกต้อง`)
      }
    } catch (error) {
      return error.message
    }
  }

  async checkTablePosDaily(config: IConfig, posname: string) {
    try {
      const pool = new PoolService(config, posname)
      let query = await pool.query(strquery.GetTablePosname)
      let row = await pool.dataRowsAffected(query)
      if (!row) throw new Error(`Data table not found!`)

      let result = await pool.dataRecordset(query)

      return result[0] // return => {Datetime, Tablename}
    } catch (error) {
      return error.message
    }
  }

  BeginSetupPosControl = async (
    config: IConfig,
    poolname: string,
    option?: string,
  ) => {
    try {
      const POS1 = new PoolService(config, poolname)
      let query = await POS1.query(strquery.Poscontrol(option))
      let data = await POS1.dataRecordset(query)
      let merg = await POS1.mergPControl(data)
      let objdata = await POS1.dataObject(merg)
      if (!objdata) throw new Error(' ไม่พบข้อมูล')

      return objdata
    } catch (error) {
      return error.message
    }
  }

  NewDataInsertPosControl = async (objdata) => {
    try {
      let created
      let updated
      let x = []
      const checkListIndex = objdata.length
      // กรณี มีข้อมูลจำนวนมาก ใช้ Index เพิ่มลูปข้อมูล
      const { _id, pos_control } = objdata[0]
      // console.log(pos_control[0])

      const findPoscontrol = await this.poscontrolModel
        .findOne({ _id })
        .select({ _id, pos_control })

      if (!findPoscontrol) {
        // ไม่พบข้อมูลให้สร้างใหม่
        // const checkList = findPoscontrol._id.lenght
        // console.log(checkListIndex)

        const create = new this.poscontrolModel(objdata[0])
        created = (await create.save()) ? true : false
        x[0] = {
          created: created,
          updated,
        }
      } else {
        const lastcIndex = findPoscontrol.pos_control.reduce(
          (curr, prev) => (curr._id > prev._id ? curr : prev),
          0,
        )
        const maxcIndex = pos_control.reduce(
          (curr, prev) => (curr > prev ? curr : prev),
          [],
        )
        // console.log(lastcIndex.cIndex + '  /   ' + maxcIndex.cIndex)
        // method 1 it's soo worked.
        if (maxcIndex.cIndex > lastcIndex.cIndex) {
          const dfIndex = maxcIndex.cIndex - lastcIndex.cIndex
          for (let i = 0; i < dfIndex; i++) {
            let getIndex = lastcIndex.cIndex + i
            findPoscontrol.pos_control.push(pos_control[getIndex])
            x[i] = { created: false, updated: true }
          }

          findPoscontrol.save()
        }
      }

      return ResponseStatus(x)
    } catch (error) {
      throw new Error(`มีข้อผิดพลาด : ${error.message}`)
    }
  }

  //#region  Create collection db PaymentType  // ความสำคัญต่ำ
  async addTablePaymentType() {
    try {
      let created: boolean = false
      let updated: boolean = false
      const mssql = new PoolService(defaultConfig(), 'default')
      const query = await mssql.query(strquery.paymentType)
      const data = await mssql.dataRecordset(query)
      const rowdata = await mssql.dataRowsAffected(query)
      if (rowdata < 1) throw new Error('ไม่พบข้อมูล...')
      // return data
      const result = data.map(async (row, index) => {
        const { _id } = row
        // console.log(`${index} : ${row}`)
        const mongodb = await this.paymentTypeModel.findOne({ _id })

        if (!mongodb) {
          // ไม่พบข้อมูลให้สร้างใหม่
          // console.log('new data')
          const create = new this.paymentTypeModel(row)
          created = (await create.save()) ? true : false
        } // else console.log('old data')

        return { created, updated }
      })

      return await ResponsePromiseStatus(result)
    } catch (error) {
      return error.message
    }
  }
}
