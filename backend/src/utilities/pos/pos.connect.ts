import { Injectable } from '@nestjs/common'
import * as mssql from 'mssql'
import { throwError } from 'rxjs'

@Injectable()
export default class PosConnect {
  posName: string
  dbName: string
  constructor(posNo: string, dbName?: string) {
    posNo = posNo.toLowerCase()
    this.posName =
      posNo === 'pos1'
        ? '192.168.1.71\\SQLExpress'
        : posNo === 'pos2'
        ? '192.168.1.56\\SQLExpress'
        : posNo === 'pos3'
        ? '192.168.1.66\\SQLExpress'
        : posNo === 'pos4'
        ? '192.168.1.220\\SQLExpress'
        : posNo === 'pos5'
        ? '192.168.100.39\\SQLExpress'
        : posNo === 'pos6'
        ? '192.168.100.40\\SQLExpress'
        : posNo
    this.dbName =
      posNo === 'pos1'
        ? 'POS-0001'
        : posNo === 'pos2'
        ? 'POS-0002'
        : posNo === 'pos3'
        ? 'POS-0003'
        : posNo === 'pos4'
        ? 'POS-0004'
        : posNo === 'pos5'
        ? 'POS-0005'
        : posNo === 'pos6'
        ? 'POS-0006'
        : dbName

    //
  }

  setconfig = (svName, dbName) => {
    return {
      user: 'sa',
      password: 'masterkey',
      server: svName,
      database: dbName,
      options: {
        encrypt: false,
        enableArithAbort: true,
        // requestTimeout: 3600,
        // connectionTimeout: 3600,
      },
    }
  }

  dataRecordset = async (result: any) => await result.recordset

  dataRowsAffected = async (result: any) => await result.rowsAffected

  query = async (string_query: string) => {
    //console.log(this.posName + '>>>>>' + this.dbName)
    const config = this.setconfig(this.posName, this.dbName)

    const queryP = await mssql
      .connect(config)
      .then(
        (pool) => pool.request().query(string_query),
        //.catch(err=> console.log(`error : ${err.message}`))
      )
      .then((result) => result)
      // .then(() => mssql.close())
      .catch((err) => `Query error : ${err.message}`)

    return queryP
  }
}
