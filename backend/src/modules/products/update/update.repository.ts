import { Injectable, ServiceUnavailableException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IDepartment } from 'src/types/product/product.interface'
import { MssqlService } from 'src/utilities/mssql/mssql.service'
import { setConfig, IConfig } from 'src/types/mssql/config'
import PoolService from 'src/utilities/mssql/pool.service'
import { qryDepartment } from './string.query'
import { defaultResponse } from 'src/types/pos/default.response'
import { changeStatus } from 'src/utilities/change.status'
import { defaultConfig, POS1Config } from 'src/config/db.config'
import * as dbs from 'src/utilities/pos/string.query'
import { store } from 'src/shared/reducer/storage'

@Injectable()
export class UpdateRepository {
  private result = new defaultResponse()
  private mssql: any
  private config = defaultConfig()
  private PoolName = 'default'
  // private Store
  constructor(@InjectModel('Departments') private model: Model<IDepartment>) {
    this.mssql = new PoolService(this.config, this.PoolName)
    // this.Store = store
  }

  async Hello() {
    // const test = await this.mssql.query(qryDepartment)
    // const result = await this.mssql.dataRecordset(test)
    return { message: 'Hello update !!' }
  }

  // INCREMENT(): void {
  //   this.Store.dispatch({ type: 'INCREMENT' })
  // }

  // DECREMENT(): void {
  //   this.Store.dispatch({ type: 'DECREMENT' })
  // }

  // ShowState() {
  //   return this.Store.getState()
  // }

  async CreateAndUpdate_Posconfig() {
    const config = POS1Config()
    try {
      const posConnect = new PoolService(config, 'POS1')
      let tableName = await posConnect.query(dbs.dailyTablePos)
      return tableName
    } catch (error) {}
  }

  async CreateAndUpdate_Department() {
    try {
      let created = false
      let updated = false
      const query = await this.mssql.query(qryDepartment)
      if (query) {
        const data = await this.mssql.dataRecordset(query)
        let dept = await data.map(async (data) => {
          const { id } = data
          const findDept = await this.model.findOne({ _id: id })
          if (!findDept) {
            const create = new this.model({
              _id: data.id,
              dept_code: data.dept_code,
              dept_thaidesc: data.dept_thaidesc,
              dept_engesc: data.dept_engesc,
              dept_access: data.dept_access,
              dept_level: data.dept_level,
              dept_abs_index: data.dept_abs_index,
              dept_parent: data.dept_parent,
              dept_p_abs_index: data.dept_p_abs_index,
              dept_firschild: data.dept_firschild,
            })
            created = (await create.save()) ? true : false

            return { created: created, updated }
          }
          return { created, updated }
        })
        const status = await changeStatus(dept)

        if (status.created > 0) {
          this.result.Status = {
            code: 1,
            message: 'Successfully created.',
          }
        }
        this.result.Created = status.created
        this.result.Updated = status.updated
      } else {
        this.result.Status = { code: 0, message: 'No change!!!' }

        this.result.Created = {}
        this.result.Updated = {}
      }
    } catch (error) {
      throw new ServiceUnavailableException(error.message)
    }

    return this.result
  }
}
