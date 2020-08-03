import { Module } from '@nestjs/common'
import { SkumasterController } from './skumaster.controller'
import { SkumasterService } from './skumaster.service'
import { MongooseModule } from '@nestjs/mongoose'
import { SkumasterSchema } from 'src/models/skumaster.schema'
import { SkumasterRepository } from './skumaster.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Skumasters', schema: SkumasterSchema },
    ]),
  ],
  controllers: [SkumasterController],
  providers: [SkumasterService, SkumasterRepository],
})
export class SkumasterModule {}
