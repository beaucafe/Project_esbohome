import { Module } from '@nestjs/common'
import { Pos003Controller } from './pos003.controller'
import { Pos003Service } from './pos003.service'
import { Pos003Repository } from './pos003.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { PosData003Schema } from 'src/models/pos/posdata.schema'
// import { ConfigModule } from '@nestjs/config'
// import posConfig from 'src/config/pos.config'

@Module({
  imports: [
    // ConfigModule.forFeature(posConfig),
    MongooseModule.forFeature([{ name: 'PosData3', schema: PosData003Schema }]),
  ],
  controllers: [Pos003Controller],
  providers: [Pos003Service, Pos003Repository],
})
export class Pos003Module {}
