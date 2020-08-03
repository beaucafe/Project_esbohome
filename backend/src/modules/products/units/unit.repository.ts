import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { InjectModel, InjectConnection } from '@nestjs/mongoose'
import { Model, Connection } from 'mongoose'
import { Unit } from 'src/types/unit'
import { MssqlService } from 'src/utilities/mssql/mssql.service'
import { UnitDto } from 'src/models/dto/unit.dto'
const mssql = new MssqlService()
@Injectable()
export class UnitRepository {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel('Unit') private unitModel: Model<Unit>,
  ) {}

  async findAllUnitFromMssql() {
    const Strquery = `SELECT  UTQ_KEY as code ,UTQ_NAME as name ,UTQ_QTY as quantity
    FROM UOFQTY`

    const query = await mssql.query(Strquery)
    return await mssql.dataRecordset(query)
  }

  async createUnitTable() {
    //const { _id, name, quantity } = unit
    try {
      const unitMssql = await this.findAllUnitFromMssql()
      const units = unitMssql.map(async (result) => {
        const { code, name, quantity } = result
        const unit_Key = await this.unitModel.findOne({ _id: code })
        if (!unit_Key) {
          let unit = new this.unitModel({
            _id: code,
            name: name,
            quantity: quantity,
          })
          return await unit.save(() => 'ok')
        }
      })
      return units
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  findCollect = (result) => {
    const map = result.map((e) => e.name)
    return map
  }

  async dropCollection(collectionName) {
    try {
      const arr = await this.connection.db.listCollections().toArray()
      const res = await this.findCollect(arr)
      let data = {
        message: `This collection '${collectionName}' does not exist`,
      }
      res.forEach((e) => {
        if (e === collectionName) {
          this.unitModel.db.dropCollection(collectionName)
            ? (data.message = `This collection '${collectionName}' has been droped.`)
            : data.message
        }
      })
      //console.log(res)

      return data
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }
}
