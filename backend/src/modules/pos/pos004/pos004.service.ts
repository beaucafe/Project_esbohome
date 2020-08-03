import { Injectable } from '@nestjs/common'
import { Pos004Repository } from './pos004.repository'
import { Cron } from '@nestjs/schedule'
import { dataSummary } from 'src/types/pos/data.summary'
import { IResponse } from 'src/types/pos/response.interface'

const getTime = new Date()
let date = getTime.getDate()
let month = getTime.getMonth() < 12 ? getTime.getMonth() + 1 : 1
let year = getTime.getFullYear()

const setTimeOff = new Date(year, month, date, 20)

@Injectable()
export class Pos004Service {
  constructor(private db: Pos004Repository) {}
  Hello() {
    return { message: 'Hello Pos004 Service!!' }
  }

  // ตั้งเวลา รันทุก 1 นาที
  // @Cron('35 * * * * *')
  // @Cron('35 * 8-17 * * 1-6')
  // every minute, on the 35th second,  between 8am and 18pm ,satureday to Friday at 11:30am
  async dataSummary(): Promise<IResponse> {
    return await this.db.testCheckPosData()
  }
}
