import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectConnection, InjectModel } from '@nestjs/mongoose'
import { Model, Connection } from 'mongoose'
import { ISkumaster } from 'src/types/skumaster'
import { MssqlService } from 'src/utilities/mssql/mssql.service'
import { productList } from './queryString.query'
import { Period } from 'src/types/period'

// const mssql = new MssqlService()

// const strquery = productList

@Injectable()
export class SkumasterRepository {
  private mssql
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel('Skumasters') private skumasterModel: Model<ISkumaster>,
  ) {
    this.mssql = new MssqlService()
  }

  async findAllSkuFromMssql() {
    const query = await this.mssql.query(productList)
    return await this.mssql.dataRecordset(query)
  }

  async showDailyOrders(Period: Period) {
    const { date_start, date_stop } = Period
    const query = await this.mssql.dailyOrders(date_start, date_stop)
    // console.log(query)

    return await this.mssql.dataRecordset(query)
  }
  async NewSkuIntoDatabase() {
    try {
      const query = await this.mssql.query(productList)
      const dataRacord = await this.mssql.dataRecordset(query)
      // const queryRows = await mssql.dataRowsAffected(query)
      const data = await this.mssql.mergdata(dataRacord)
      const result = await this.mssql.dataToArr(data)
      const dataSave = await result.map(async (data) => {
        const {
          skucode,
          skukey,
          skuname,
          barcode_detail,
          skudetails,
          stock,
        } = data

        const findSku = await this.skumasterModel.findOne({ skucode: skucode })

        if (!findSku) {
          const mongoSent = new this.skumasterModel({
            _id: skukey,
            skucode: skucode,
            skuname: skuname,
            barcode_detail: barcode_detail,
            skudetails: skudetails,
            stock: stock,
          })
          await mongoSent.save()
        }
      })
      return { message: dataSave.length }
      // res.status(200).json({
      //   data: queryRows,
      // })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findSkuUnit() {
    const sku = await this.skumasterModel
      .findOne({ _id: '5edcac6e3d970a0aa8a5b9fc' })
      .populate({ path: 'skudetails.unit', select: 'name -_id' })
      .limit(10)

    return { data: sku }
  }
}
