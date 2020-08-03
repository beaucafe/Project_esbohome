import { Injectable } from '@nestjs/common'
// import getPool from 'src/utilities/mssql/pool.connect'
import { setConfig } from 'src/types/mssql/config'
import PoolService from 'src/utilities/mssql/pool.service'

const config: setConfig = {
  user: 'sa',
  password: 'Tik43045811',
  server: 'esbohome.net',
  database: 'ESBOStore',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
}

@Injectable()
export class PosService {
  constructor() {}
  Hello() {
    return { message: 'Hello PosSevice!' }
  }

  // run a query
  // async runQuery() {
  //   // pool will always be connected when the promise has resolved - may reject if the connection config is invalid
  //   const pool = await getPool('default5', config)
  //   const result = await pool
  //     .request()
  //     .query('select top 1 sku_code, sku_name from skumaster')
  //   return result
  // }

  // async runQuery2() {
  //   // pool will always be connected when the promise has resolved - may reject if the connection config is invalid
  //   const pool = await getPool('default', config)
  //   const result = await pool
  //     .request()
  //     .query('select top 1 sku_code, sku_name from skumaster')
  //   return result
  // }

  async run4() {
    const pool = new PoolService(config, 'Pos1')
    const query = await pool.query(
      'select top 1 sku_code, sku_name from skumaster',
    )
    const result = await pool.dataRecordset(query)

    return result
  }
}
