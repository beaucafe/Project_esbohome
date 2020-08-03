import { Injectable } from '@nestjs/common'
import * as mssql from 'mssql'

@Injectable()
export class MssqlConnect {
  setconfig: {}
  constructor(serverName?: string, dbName?: string) {
    this.setconfig = {
      user: 'sa',
      password: 'Tik43045811',
      server: !serverName ? 'esbohome.net' : serverName,
      database: !dbName ? 'ESBOStore' : dbName,
      options: {
        encrypt: false,
        enableArithAbort: true,
        requestTimeout: 3600,
        connectionTimeout: 3600,
      },
    }
  }

  dataRecordset = async (result) => await result.recordset

  dataRowsAffected = async (result) => await result.rowsAffected

  query = async (query: string) => {
    console.log(this.setconfig)
    try {
      const queryP = await mssql
        .connect(this.setconfig)
        .then(
          (pool) => pool.request().query(query),
          //.catch(err=> console.log(`error : ${err.message}`))
        )
        .then((result) => result)
        //.then(() => mssql.close())
        .catch((err) => `Query error : ${err.message}`)
      //mssql.close()
      return queryP
    } catch (error) {
      return error.message
    }
  }

  //------------  query store procedure
  dailyOrders = async (start, stop) => {
    // console.log(this.setconfig)
    try {
      const query = await mssql
        .connect(this.setconfig)
        .then((pool) => {
          return pool
            .request()
            .input('date_start', mssql.DateTime, start)
            .input('date_stop', mssql.DateTime, stop)
            .execute('sp_daily_orders')
        })
        .then((result) => {
          if (result) mssql.close()

          return result
        })
        //.then((result) => (result ? mssql.close() : result))
        .catch((e) => `Query dailyOrders error : ${e.message}`)

      return query
    } catch (error) {
      return error.message
    }
  }

  checkStock = async (skucode, branch) => {
    const sp = await mssql
      .connect(this.setconfig)
      .then((pool) => {
        return pool
          .request()
          .input('skucode', mssql.VarChar(20), skucode)
          .input('wlcode', mssql.VarChar(20), branch)

          .execute('sptop_skuqty')
      })
      .then((result) =>
        result.recordset[0].skm_qty == null ? 0 : result.recordset[0].skm_qty,
      )
      .catch((e) => `checkStock error : ${e.message}`)

    return sp
  }
  //------------  query store procedure  ------  end ----- //

  dataToArr = async (objsku) => {
    const objkey = Object.keys(objsku).reduce((result, key) => {
      const skucode = objsku[key][0].skucode
      const skukey = objsku[key][0].skukey
      const skuname = objsku[key][0].skuname
      const barcode_detail = objsku[key][0].barcode
      const skudetails = objsku[key][0].skudetails
      const stock = objsku[key][0].stock

      result.push({
        skucode,
        skukey,
        skuname,
        barcode_detail,
        skudetails,
        stock,
      })

      return result
    }, [])

    return objkey
  }

  checkBalance = async (skucode) => {
    const stock = { HO: 0, H1: 0 }
    stock.HO = await this.checkStock(skucode, 'HO')
    stock.H1 = await this.checkStock(skucode, 'H1')
    return stock
  }

  mergdata = async (query) => {
    const data = await query.reduce((result, item) => {
      let key = item.skucode
      //resultLog(item)

      if (result[key]) {
        result[key][0].barcode.push({
          _id: item.barcode_key,
          code: item.barcode,
          alias_name: item.alias_name,
          alias_name_eng: item.alias_name,
          unit: item.bar_unit,
          quantity: item.bar_quantity,
          volume: item.volume,
          weight: item.weight,
          sales_enable: item.sales_enable === 'Y' ? true : false,
          purchases_enable: item.purchases_enable === 'Y' ? true : false,
          main_price: item.main_price === 'Y' ? true : false,
          control_price: item.control_price,
        })
      } else {
        result[key] = result[key] || [
          {
            skucode: key,
            skukey: item.skukey,
            skuname: item.skuname,
            // barcode: [],  สามารถลดจำนวน Document ที่ซ้ำกับ sku ลงได้
            barcode: [
              {
                _id: item.barcode_key,
                code: item.barcode,
                alias_name: item.alias_name,
                alias_name_eng: item.alias_name,
                unit: item.bar_unit,
                quantity: item.bar_quantity,
                volume: item.volume,
                weight: item.weight,
                sales_enable: item.sales_enable === 'Y' ? true : false,
                purchases_enable: item.purchases_enable === 'Y' ? true : false,
                main_price: item.main_price === 'Y' ? true : false,
                control_price: item.control_price,
              },
            ],
            skudetails: {
              department: item.department,
              unit: item.quantity,
              min: item.min,
              max: item.max,
            },
            stock: { HO: 0, H1: 0 },
          },
        ]
      }
      return result
    }, {})

    return data
  }
}
