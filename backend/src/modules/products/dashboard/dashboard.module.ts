import { Module } from '@nestjs/common'
import { DashboardController } from './dashboard.controller'
import { DashboardService } from './dashboard.service'
import { DashboardRepository } from './dashboard.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { DashboardOrderInfoSchema } from 'src/models/dashboard/dashboardOrderinfo.schema'
import { DailyorderSchema } from 'src/models/dashboard/dailyOrder.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DashboardOrderinfos', schema: DashboardOrderInfoSchema },
      { name: 'Dailyorders', schema: DailyorderSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService, DashboardRepository],
})
export class DashboardModule {}
