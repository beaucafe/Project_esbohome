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
