import { Module } from '@nestjs/common'
import { PosController } from './pos.controller'
import { PosService } from './pos.service'
import { Pos001Module } from './pos001/pos001.module'
import { Pos002Module } from './pos002/pos002.module'
import { Pos003Module } from './pos003/pos003.module'
import { Pos004Module } from './pos004/pos004.module'
import { Pos005Module } from './pos005/pos005.module'
import { Pos006Module } from './pos006/pos006.module'

@Module({
  controllers: [PosController],
  providers: [PosService],
  imports: [
    Pos001Module,
    Pos002Module,
    Pos003Module,
    Pos004Module,
    Pos005Module,
    Pos006Module,
  ],
})
export class PosModule {}
