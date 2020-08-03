export interface IpoolName {
  PoolName: string
}

// export interface IMSSQL {
//   PoolService: any
//   query: (string) => object
//   dataRecordset: (any) => object
//   dataRowsAffected: () => object
// }

export interface setConfig {
  user: string
  password: string
  server: string
  database: string
  port?: number
  stream?: boolean
  options: {
    encrypt: boolean
    enableArithAbort: boolean
    requestTimeout?: number
    connectionTimeout?: number
    stream?: boolean
  }
  pool?: {
    max: number
    min: number
    idleTimeoutMillis: number
    stream?: boolean
  }
}

export interface IConfig extends setConfig {}
