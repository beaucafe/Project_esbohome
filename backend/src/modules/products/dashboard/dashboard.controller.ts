import { Controller, Get, Post, Body } from '@nestjs/common'
import { PeriodDTO } from 'src/models/dto/period.dto'
import { DashboardService } from './dashboard.service'

interface hello {
  message: string
  test: string
}

@Controller('')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get()
  async getHello(): Promise<any> {
    const day = new Date().getDate() - 1
    const month = new Date().getMonth()
    const year = new Date().getFullYear()

    const r = await this.dashboardService.showTest()

    return {
      message: `${r}`,
      test: `วันที่ : ${day} , เดือน : ${month}, ปี : ${year}`,
    }
  }

  @Post('/dailyorders')
  async showDailyOrder(@Body() period: PeriodDTO) {
    return await this.dashboardService.showDailyOrders(period)
  }

  @Post('/orderreport')
  async showReport() {
    return this.dashboardService.showOrderReport()
  }
}
