import { Injectable } from '@nestjs/common'
import { Pos001Repository } from './pos001.repository'
import { Cron } from '@nestjs/schedule'
import { dataSummary } from 'src/types/pos/data.summary'
import { IResponse } from 'src/types/pos/response.interface'

const getTime = new Date()
let date = getTime.getDate()
let month = getTime.getMonth() < 12 ? getTime.getMonth() + 1 : 1
let year = getTime.getFullYear()

const setTimeOff = new Date(year, month, date, 20)

@Injectable()
export class Pos001Service {
  constructor(private db: Pos001Repository) {}
  Hello() {
    return { message: 'Hello Pos001 Service!!' }
  }
  // // ตั้งเวลา รันทุก 1 นาที
  // @Cron('5 * * * * *')
  // @Cron('5 * 7-20 * * *')
  // every minute, on the 5th second,  between 7am and 20pm
  async dataSummary(): Promise<IResponse> {
    return await this.db.testCheckPosData()
  }
}
