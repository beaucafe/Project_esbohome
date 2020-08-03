import * as sql from 'mssql'
import { Injectable } from '@nestjs/common'
import { setConfig, IConfig } from 'src/types/mssql/config'
import { qryDepartment } from 'src/modules/products/update/string.query'
import {
  POS1Config,
  POS2Config,
  POS3Config,
  POS4Config,
  defaultConfig,
} from 'src/config/db.config'

@Injectable()
export default class PoolService {
  POOLS = []

  constructor(private Config: IConfig | string, private PoolName?: string) {
    // this.Config = config
    // this.PoolName = pName
  }

  private poolConnect = (PoolName) => {
    let poolName = PoolName.toLowerCase()
    switch (poolName) {
      case 'pos1':
        return { config: POS1Config(), poolname: 'POS1' }
        break
      case 'pos2':
        return { config: POS2Config(), poolname: 'POS2' }
        break
      case 'pos3':
        return { config: POS3Config(), poolname: 'POS3' }
        break
      case 'pos4':
        return { config: POS4Config(), poolname: 'POS4' }
        break
      case 'default':
        return { config: defaultConfig(), poolname: 'Default' }
        break
      default:
        throw new Error(`พบข้อผิดพลาด : posname (${poolName}) : ไม่ถูกต้อง`)
    }
  }

  connect = async () => {
    // let POOLS = this.POOLS
    let name = this.PoolName
    let config = this.Config
    if (!(this.Config instanceof Object)) {
      config = this.poolConnect(this.Config).config
      name = this.poolConnect(this.Config).poolname
    }

    if (!Object.prototype.hasOwnProperty.call(this.POOLS, name)) {
      const pool = new sql.ConnectionPool(config)
      const close = pool.close.bind(pool)
      pool.close = (...args) => {
        delete this.POOLS[name]
        return close(...args)
      }
      await pool.connect()
      this.POOLS[name] = pool
    }
    return this.POOLS[name]
  }

  getPool = (name) => {
    if (Object.prototype.hasOwnProperty.apply(this.POOLS, [name])) {
      return this.POOLS[name]
    }
  }

  closePool = (name) => {
    if (Object.prototype.hasOwnProperty.apply(this.POOLS, [name])) {
      const pool = this.POOLS[name]
      delete this.POOLS[name]
      return pool.close()
    }
  }

  query = async (strquery) => {
    const result = await this.connect()
      .then((pool) => pool.request().query(strquery))
      .then((result) => result)
      .catch((err) => `Query error : ${err.message}`)

    this.Config instanceof Object
      ? console.log('\n' + this.PoolName + ' pool connected.')
      : console.log(
          '\n' + this.poolConnect(this.Config).poolname + ' pool connected!',
        )

    return result
  }

  dataRecordset = async (result) => await result.recordset

  dataRowsAffected = async (result) => await result.rowsAffected

  queryStream = async (strquery) => {
    const result = await this.connect()
      .then((pool) => {
        const request = pool.request()
        request.stream = true
        request.query(strquery)
        return request
      })
      .catch((err) => `Stream query error : ${err.message}`)
    return result
  }

  mergPControl = async (query) => {
    const data = await query.reduce((result, item) => {
      let {
        _id,
        pos_station,
        pos_name,
        pos_branch,
        pos_taxID,
        pos_posID,
        cIndex,
        dataTable,
        date_from,
        date_to,
      } = item
      let pos_control = { cIndex, dataTable, date_from, date_to }
      // let key = _id
      //resultLog(item)

      if (result[_id]) {
        result[_id][0].pos_control.push(pos_control)
      } else {
        result[_id] = result[_id] || [
          {
            _id,
            pos_station,
            pos_name,
            pos_branch,
            pos_taxID,
            pos_posID,
            pos_control: [pos_control],
          },
        ]
      }
      return result
    }, {})

    return data
  }

  dataObject = async (dataControl) => {
    const data = Object.keys(dataControl).reduce((result, key) => {
      result.push(dataControl[key][0])

      return result
    }, [])

    return data
  }
}

// // close all pools
// const closeAll = () => {
//   return Promise.all(
//     Object.values(pools).map((pool) => {
//       return pool.close()
//     }),
//   )
// }
