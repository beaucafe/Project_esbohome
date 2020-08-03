import { Injectable } from '@nestjs/common'
import { DashboardRepository } from './dashboard.repository'

@Injectable()
export class DashboardService {
  constructor(private dashboardRepository: DashboardRepository) {}

  showDailyOrders(Period) {
    return this.dashboardRepository.showDailyOrders(Period)
    // return { message: 'Daily Orders' }
  }

  showTest() {
    return this.dashboardRepository.testmng()
  }

  showOrderReport() {
    return this.dashboardRepository.dailyUpdate()
  }
}
