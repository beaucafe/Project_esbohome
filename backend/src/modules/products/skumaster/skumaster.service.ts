import { Injectable, Get } from '@nestjs/common'
import { ISkumaster } from 'src/types/skumaster'
import { SkumasterRepository } from './skumaster.repository'

@Injectable()
export class SkumasterService {
  constructor(
    // @InjectConnection() private connection: Connection,
    private skumasterReps: SkumasterRepository,
  ) {}
  findSku() {
    return this.skumasterReps.findAllSkuFromMssql()
  }

  CreateSkuMaster() {
    return this.skumasterReps.NewSkuIntoDatabase()
  }

  findSkuUnit() {
    return this.skumasterReps.findSkuUnit()
  }

  showDailyOrders(Period) {
    return this.skumasterReps.showDailyOrders(Period)
    // return { message: 'Daily Orders' }
  }
}
