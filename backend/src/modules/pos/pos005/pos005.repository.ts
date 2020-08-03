import { Injectable } from '@nestjs/common'
import { setConfig } from 'src/types/mssql/config'
import PoolService from 'src/utilities/mssql/pool.service'
import { Drawer } from './test.class'

@Injectable()
export class Pos005Repository {
  Hello() {
    return { message: 'Hello Pos005 Service!!' }
  }
}
