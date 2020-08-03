import {
  Injectable,
  HttpException,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common'
import * as dbs from 'src/utilities/pos/string.query'
import * as moment from 'moment'
// import 'moment/locale/th'
import { dataSummary } from 'src/types/pos/data.summary'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
// import PosConnect from 'src/utilities/pos/pos.connect'
import { IResponse } from 'src/types/pos/response.interface'
import { setConfig } from 'src/types/mssql/config'
import PoolService from 'src/utilities/mssql/pool.service'
// import posConfig from 'src/config/pos.config'

@Injectable()
export class Pos004Repository {
  PosName: string
  PoolConnect: any
  // pos = new PosConnect(this.PosName)
  private dataDefault: IResponse = {
    Created: {},
    Updated: {},
    Status: {
      code: 0,
      message: 'No change!!',
    },
  }
  config: setConfig
  constructor(
    @InjectModel('PosData4')
    private posModel: Model<dataSummary>,
  ) {
    this.PosName = 'POS4'
    this.config = {
      user: process.env.USERPOS,
      password: process.env.PASSPOS,
      server: process.env.SVR_POS4,
      database: process.env.DBPOS4,
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        encrypt: false,
        enableArithAbort: true,
      },
    }
    //console.log(this.config.user)
    this.PoolConnect = this.MssqlConnect(this.config, this.PosName)
  }

  Hello() {
    return { message: 'Hello Pos004 Service!!' }
  }

  MssqlConnect = (config, PosName) => {
    try {
      //return  new PoolService(this.config, this.PosName)
      const pool = new PoolService(config, PosName)
      if (!pool) throw new Error(`Unable to contact this database.`)

      return pool
    } catch (error) {
      throw new ServiceUnavailableException(`Unable to contact this database.`)
    }
  }

  PosTable = async () => {
    // const pool = await this.MssqlConnect()
    let query = await this.PoolConnect.query(dbs.dailyTablePos)
    if (!query) throw Error
    let result = await this.PoolConnect.dataRecordset(query)

    return result[0] // return => {Datetime, Tablename}
  }

  dataSummary = async () => {
    // const pool = await this.MssqlConnect()
    if (!this.PoolConnect) throw new Error(`Unable to contact this database.`)

    let table = (await this.PosTable()).Tablename
    if (!table) throw new Error('Data table not found!!')

    let str = await dbs.dailySummary(table)
    let query = await this.PoolConnect.query(str)
    if (!query) throw new Error(`${table} Tablename not found!!`)

    let total = await this.PoolConnect.dataRecordset(query)

    const { pre_tax, tax_amount, tax_total } = total[0] // ยอดขาย

    str = await dbs.billData(table)
    query = await this.PoolConnect.query(str)
    if (!query) throw new Error(`billData not found!!`)

    const billData = await this.PoolConnect.dataRecordset(query) // ข้อมูลบิล

    str = await dbs.billCancel(table)
    query = await this.PoolConnect.query(str)
    if (!query) throw new Error(`billCancel not found!!`)
    const bCancel = await this.PoolConnect.dataRecordset(query) // ข้อมูลเปลี่ยนแปลง การขาย POS

    const billMB = billData
      .filter((r) => {
        if (r.mbCard) return r
      })
      .map((r) => r.mbCard) // ข้อมูลการซื้อสมาชิก
    //console.log(billMB)

    const lastBill = billData.reduce((rest, data) => {
      const last = rest.PSH_NO > data.PSH_NO ? rest : data

      return last
    }, 0)

    const data: dataSummary = {
      documentRunning: `${this.PosName}${table}`,
      preTax: pre_tax,
      taxTotal: tax_total,
      taxAmount: tax_amount,
      billTotal: billData.length,
      billCancel: bCancel.length,
      billMember: billMB.length,
      lastBill: lastBill,
    }

    return data
  }

  testCheckPosData = async () => {
    try {
      let result = this.dataDefault
      const dataDB = await this.dataSummary()
      if (!dataDB) throw new Error(`dataSummary error!!`)

      const { documentRunning, lastBill } = dataDB
      const { billNo } = lastBill
      //console.log(dataDB.documentRunning)
      const mondb = await this.posModel.findOne({ documentRunning })

      if (!mondb) {
        const newCreate = new this.posModel({
          documentRunning: documentRunning,
          preTax: dataDB.preTax,
          taxTotal: dataDB.taxTotal,
          taxAmount: dataDB.taxAmount,
          billTotal: dataDB.billTotal,
          billCancel: dataDB.billCancel,
          billMember: dataDB.billMember,
          lastBill: lastBill,
        })
        // Save data create......
        result.Status = {
          code: 1,
          message: 'Successfully created a new collection.',
        }
        result.Created = await newCreate.save()

        //console.log(dataSave)
      } else {
        let mon = mondb.lastBill.billNo
        let ms = billNo
        // let crt = mondb.createdAt
        //console.log(moment(crt).format('LLLL'))

        if (mon < ms || !mon) {
          mondb.preTax = dataDB.preTax
          mondb.taxTotal = dataDB.taxTotal
          mondb.taxAmount = dataDB.taxAmount
          mondb.billTotal = dataDB.billTotal
          mondb.billCancel = dataDB.billCancel
          mondb.billMember = dataDB.billMember
          mondb.lastBill = lastBill
          // Save update...
          result.Status = {
            code: 2,
            message: 'Successfully updated the collection.',
          }
          result.Updated = await mondb.save()

          //console.log(dbUpdate.lastBill)
        } else {
          result.Status = {
            code: 0,
            message: 'No change!!',
            lastData: {
              taxTotal: dataDB.taxTotal,
              billTotal: dataDB.billTotal,
            },
            lastBill: lastBill,
          }
          result.Created = {}
          result.Updated = {}
        }
      }

      return result
    } catch (error) {
      throw new ServiceUnavailableException(`${error.message}`)
    }
  }
}
