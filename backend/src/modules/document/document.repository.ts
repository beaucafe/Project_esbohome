import { Injectable, BadRequestException } from '@nestjs/common'
import { MssqlService } from 'src/utilities/mssql/mssql.service'
import { InjectConnection, InjectModel } from '@nestjs/mongoose'
import { Connection, Model } from 'mongoose'
import {
  IDocrun,
  IDoctype,
  IDocinfo,
  IDocdetail,
} from 'src/types/document.interface'
import { doctypeList } from '../products/skumaster/queryString.query'

const mssql = new MssqlService()

const date = new Date()
let day = date.getDate()
let month = date.getMonth() < 12 ? date.getMonth() + 1 : 1
let year = date.getFullYear()

// const days = new Date().getDate() - 1 // test rollback 1 day
// const months = new Date().getMonth()
// const years = new Date().getFullYear()

@Injectable()
export class DocumentRepository {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel('Doctypes')
    private doctypeModel: Model<IDoctype>,
    @InjectModel('Docruns')
    private docrunModel: Model<IDocrun>,
    @InjectModel('Docinfos')
    private docinfoModel: Model<IDocinfo>,
    @InjectModel('Docdetails')
    private docdetailModel: Model<IDocdetail>,
  ) {}

  async testCreate() {
    try {
      let result = {
        data: {},
        error: {},
      }
      const find = await this.doctypeModel.findOne({ dtthainame: 'แดชบอร์ด' })
      if (!find) {
        const query = new this.doctypeModel({
          dtkey: 1,
          dtthainame: 'แดชบอร์ด',
          dtcode: 'dhb',
        })
        query.save((error) => {
          //console.log(error)

          if (error) result.error = new BadRequestException(error.message)
        })
        //console.log(query)
        result.data = query
        return result
      }
      result.data = { message: 'ข้อมูลมีออยู่แล้ว!!!', data: find }
      return result
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async DoctypeDataLoading() {
    try {
      const query = await mssql.query(doctypeList)
      const data = await mssql.dataRecordset(query)
      const result = await data.map((resp) => this.doctypedb(resp))
      // return { message: 'Doctype loading, successfully.' }
      return result
    } catch (error) {
      throw error.message
      // new BadRequestException(error.message)
    }
  }

  // sup function
  doctypedb = async (data) => {
    let result = { message: 0 }
    try {
      const checkDB = await this.doctypeModel.findOne({ dtkey: data.dtkey })
      if (!checkDB) {
        const db = new this.doctypeModel({
          dtkey: data.dtkey,
          doccode: data.doccode,
          dtthainame: data.dtthainame,
          dtengname: data.dtengname,
          properties: data.properties,
          runtype: data.runtype,
          prefix: data.prefix,
          digit: data.digit,
          vatref: data.vatref,
        })
        db.save((error) => {
          //console.log(error)
          if (error) throw error.message
        })
        result.message = 1
        return result
      }
      return result
    } catch (error) {
      throw error.message
    }
  }
}
