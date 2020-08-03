import { Module } from '@nestjs/common'
import { Pos001Controller } from './pos001.controller'
import { Pos001Service } from './pos001.service'
import { Pos001Repository } from './pos001.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { PosData001Schema } from 'src/models/pos/posdata.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PosData', schema: PosData001Schema }]),
  ],
  controllers: [Pos001Controller],
  providers: [Pos001Service, Pos001Repository],
})
export class Pos001Module {}
