import { Module } from '@nestjs/common'
import { Pos004Controller } from './pos004.controller'
import { Pos004Service } from './pos004.service'
import { Pos004Repository } from './pos004.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { PosData004Schema } from 'src/models/pos/posdata.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PosData4', schema: PosData004Schema }]),
  ],
  controllers: [Pos004Controller],
  providers: [Pos004Service, Pos004Repository],
})
export class Pos004Module {}
