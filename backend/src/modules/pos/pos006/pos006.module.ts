import { Module } from '@nestjs/common'
import { Pos006Controller } from './pos006.controller'
import { Pos006Service } from './pos006.service'

@Module({
  controllers: [Pos006Controller],
  providers: [Pos006Service],
})
export class Pos006Module {}
