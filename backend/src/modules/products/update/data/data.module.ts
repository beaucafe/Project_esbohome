import { Module } from '@nestjs/common'
import { DataController } from './data.controller'
import { DataService } from './data.service'
import { MongooseModule } from '@nestjs/mongoose'
import {
  PoscontrollerSchema,
  PaymentTypeSchema,
  POSDataxSchema,
  PosdataSchema,
  PosdataRunningSchema,
} from 'src/models/pos/posdata.schema'
import { DataRepository } from './data.repository'
import { DataMonthly } from './data.month'
import { DataDaily } from './data.daily'
import { dataClass } from './data.class'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Poscontroller', schema: PoscontrollerSchema },
      { name: 'PaymentType', schema: PaymentTypeSchema },
      { name: 'Posdatax', schema: POSDataxSchema },
      { name: 'Posdata', schema: PosdataSchema },
      { name: 'Posdatarunning', schema: PosdataRunningSchema },
    ]),
  ],
  controllers: [DataController],
  providers: [DataService, DataRepository, DataMonthly, DataDaily, dataClass],
})
export class DataModule {}
