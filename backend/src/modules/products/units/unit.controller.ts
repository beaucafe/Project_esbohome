import { Controller, Get, UseGuards, Post, Param } from '@nestjs/common'

import { AuthGuard } from '@nestjs/passport'
import { UserRoleGuard } from 'src/guards/userRole.guard'
import { UnitService } from './unit.service'
import { Unit } from 'src/types/unit'

@Controller()
// @UseGuards(AuthGuard('jwt'), UserRoleGuard)
export class UnitsController {
  constructor(private unitService: UnitService) {}

  @Get()
  async getHello() {
    return 'Hello Products/unit page !!!!'
  }

  @Get('/all')
  async findUnit(): Promise<Unit> {
    return this.unitService.findUnit()
  }

  @Post('/droptable/:name')
  async checkCollection(@Param('name') name: string) {
    return await this.unitService.dropCollection(name)
  }

  @Post('/unitTable')
  async createUnitTable() {
    return await this.unitService.createUnit()
  }
}
