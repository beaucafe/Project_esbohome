import { Injectable } from '@nestjs/common'
import { DataRepository } from './data.repository'
import { changeStatus } from 'src/utilities/change.status'
import { defaultResponse } from 'src/types/pos/default.response'
import { DataMonthly } from './data.month'
import { ISummaryByPOS } from 'src/models/pos/posdata.interface'
import { DataDaily } from './data.daily'
import { ISETTIME } from 'src/libs/datetostring/date.type'

interface IPosname {
  name: string
}

@Injectable()
export class DataService {
  private result = new defaultResponse()
  constructor(
    private db: DataRepository,
    private month: DataMonthly,
    private daily: DataDaily,
  ) {}
  Hello = () => 'Update data!!!.'

  // getPosconfig() {
  //   return this.db.Poscontrol()
  // }

  test() {
    return this.daily.test()
    // return this.month.gettblPosName('possss1')
  }

  dailyTest(posname: string, setTime?: ISETTIME) {
    if (setTime === undefined) return this.daily.dailytest(posname)

    return this.daily.dailytest(posname, setTime)

    // return this.month.gettblPosName('possss1')
  }

  tablepos(posname: IPosname) {
    const { name } = posname
    return this.db.testData(name)
  }

  async manualAdjPoscontrol(posname: IPosname) {
    const { name } = posname

    return await this.db.Poscontrol(name)
  }

  async AddtablePaymentType() {
    return await this.db.addTablePaymentType()
  }

  async updatePosdataByPos(posname: IPosname) {
    const { name } = posname
    return await this.db.PosdataByPosName_Daily(name)
  }
  async updatePosdataByPosV2(posname: IPosname) {
    const { name } = posname
    return await this.db.PosdataByPosName_Daily_V2(name)
  }

  async getSummaryMonth(posname: IPosname): Promise<ISummaryByPOS> {
    const { name } = posname
    return await this.month.getSumMonth(name)
  }
}
