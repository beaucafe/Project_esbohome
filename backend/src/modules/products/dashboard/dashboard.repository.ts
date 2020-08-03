import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common'
import { MssqlService } from 'src/utilities/mssql/mssql.service'
import { Period } from 'src/types/period'
import { Model, Connection } from 'mongoose'
import { InjectModel, InjectConnection } from '@nestjs/mongoose'
import {
  IDashboardOrderInfo,
  IDailyOrder,
} from 'src/types/dashboardOrderInfo.interface'
import { MssqlConnect } from 'src/utilities/mssql/mssql.connect'

// const mssql = new MssqlService()
const days = new Date().getDate() - 1 // test rollback 1 day
const months = new Date().getMonth()
const years = new Date().getFullYear()
const doctypes = 'Order report'

@Injectable()
export class DashboardRepository {
  mssql: any
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel('DashboardOrderinfos')
    private orderinfoModel: Model<IDashboardOrderInfo>,
    @InjectModel('Dailyorders')
    private dailyModel: Model<IDailyOrder>,
  ) {
    //this.mssql = new MssqlConnect('1', '2')
    this.mssql = new MssqlConnect(process.env.SVNAME, process.env.DBNAME)
  }

  async showDailyOrders(Period: Period) {
    try {
      const { date_start, date_stop } = Period
      const query = await this.mssql.dailyOrders(date_start, date_stop)

      return await this.mssql.dataRecordset(query)
    } catch (error) {
      return error.message
    }
  }

  dailyCheckDB = async (doctypes, callback?: IDashboardOrderInfo) => {
    try {
      let result = {
        message: 'Already',
        query: callback,
      }
      let findDoc = await this.orderinfoModel.findOne({ doctype: doctypes })
      const { doctype, year, month, sequence } = findDoc
      if (!doctype) {
        let create = new this.orderinfoModel({
          doctype: doctypes,
          year: years,
          month: months,
          sequence: [
            {
              _id: days,
            },
          ],
        })
        create.save((err, pos) => {
          if (err) throw new Error(err.message)
          return pos
        })
        result.message = `${doctypes} new created.`
        result.query = create
        //return result
      } else if (year !== years) {
        console.log('create of year')
      } else if (month !== months) {
        console.log('create of month')
      } else console.log(`${findDoc._id}, ${doctype}, ${year}, ${month}`)
      console.log(`${sequence.length - 1}`)

      result.query = findDoc
      return result
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  async dailyUpdate() {
    const mongo = await this.dailyCheckDB(doctypes)
    const { sequence } = mongo.query
    let seq = sequence.map((r) => {
      if (r._id === days && r.details === undefined) console.log('new details')
      else console.log('updated')
    })
  }

  // async dailyUpdate() {
  //   const date_current = `${year}-${month}-${day}`
  //   try {
  //     const query = await mssql.dailyOrders(date_current, date_current)
  //     const row = await mssql.dataRowsAffected(query)
  //     const result = await mssql.dataRecordset(query)

  //     const dailyUpdate = result.map(async (respon) => {
  //       const {
  //         skucode,
  //         thainame,
  //         engname,
  //         u_name,
  //         u_quantity,
  //         skumove_key,
  //         lot_number,
  //         serial_number,
  //         pur_amount,
  //         free,
  //         cost,
  //         sell,
  //         vat,
  //         doctype_thaidesc,
  //         doctype_properties,
  //       } = respon
  //       // const daily = await this.DashboardOrderInfoModel.find()
  //       const mongo = await dailyCheckDB('Order report')
  //       console.log(mongo)

  //       return mongo
  //     })
  //   } catch (error) {
  //     throw new BadRequestException(error.message)
  //   }
  // }

  findCollect = (result) => {
    const map = result.map((e) => e.name)
    return map
  }

  async testmng() {
    try {
      let query = await this.orderinfoModel.findOne({ doctype: 'test' })
      if (!query) {
        let po = new this.dailyModel({
          skucode: '12345',
        })

        po.save((err, pos) => {
          if (err) throw new Error(err.message)
          let create = new this.orderinfoModel({
            infotype: 'test',
            sequence: {
              details: pos._id,
            },
          })
          create.save((err, pos) => {
            if (err) throw new Error(err.message)
            //console.log(pos)
          })
          //console.log(pos)
        })

        return 'Saved!!!'
      }
    } catch (error) {
      return error.message
    }
  }
}
