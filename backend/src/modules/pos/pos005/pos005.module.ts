import { Module } from '@nestjs/common'
import { Pos005Controller } from './pos005.controller'
import { Pos005Service } from './pos005.service'
import { Pos005Repository } from './pos005.repository'

@Module({
  controllers: [Pos005Controller],
  providers: [Pos005Service, Pos005Repository],
})
export class Pos005Module {}
