import { Module } from '@nestjs/common'
import { UpdateController } from './update.controller'
import { UpdateService } from './update.service'
import { UpdateRepository } from './update.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { DepartmentSchema } from 'src/models/product/product.schema'
import { DataModule } from './data/data.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Departments', schema: DepartmentSchema },
    ]),
    DataModule,
  ],
  controllers: [UpdateController],
  providers: [UpdateService, UpdateRepository],
})
export class UpdateModule {}
