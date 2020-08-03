import { Module } from '@nestjs/common'
import { UnitsController } from './unit.controller'
import { UnitService } from './unit.service'
import { UnitRepository } from './unit.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { UnitSchema } from 'src/models/unit.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Unit', schema: UnitSchema }])],
  controllers: [UnitsController],
  providers: [UnitRepository, UnitService],
})
export class UnitsModule {}
