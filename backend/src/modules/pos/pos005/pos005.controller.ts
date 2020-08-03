import { Controller, Get } from '@nestjs/common'
import { Pos005Service } from './pos005.service'

@Controller()
export class Pos005Controller {
  constructor(private posService: Pos005Service) {}

  @Get()
  Hello() {
    return this.posService.Hello()
  }

  @Get('/test')
  Test() {
    return this.posService.Test()
  }
}
