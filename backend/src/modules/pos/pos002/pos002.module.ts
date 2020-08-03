import { Module } from '@nestjs/common'
import { Pos002Controller } from './pos002.controller'
import { Pos002Service } from './pos002.service'
import { PosData002Schema } from 'src/models/pos/posdata.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { Pos002Repository } from './pos002.repository'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PosData2', schema: PosData002Schema }]),
  ],
  controllers: [Pos002Controller],
  providers: [Pos002Service, Pos002Repository],
})
export class Pos002Module {}
