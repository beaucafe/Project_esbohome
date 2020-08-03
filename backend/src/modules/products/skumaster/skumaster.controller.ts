import { Controller, Get, Post, Body } from '@nestjs/common'
import { SkumasterService } from './skumaster.service'
import { ISkumaster } from 'src/types/skumaster'
import { PeriodDTO } from 'src/models/dto/period.dto'

@Controller()
export class SkumasterController {
  constructor(private skumasterService: SkumasterService) {}

  @Get()
  getHello(): Object {
    return { message: 'Hello skumaster' }
  }

  @Get('/all')
  async findSku(): Promise<any> {
    return await this.skumasterService.findSku()
  }

  @Get('/skuunit')
  async findSkuUnit(): Promise<any> {
    return await this.skumasterService.findSkuUnit()
  }

  @Post('/Create')
  async createSkuMaster(): Promise<any> {
    return await this.skumasterService.CreateSkuMaster()
  }

  // @Post('/dailyorders')
  // async showDailyOrder(@Body() period: PeriodDTO) {
  //   return await this.skumasterService.showDailyOrders(period)
  // }
}
