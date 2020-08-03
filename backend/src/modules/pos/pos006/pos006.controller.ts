import { Controller, Get } from '@nestjs/common'
import { Pos006Service } from './pos006.service'

@Controller()
export class Pos006Controller {
  constructor(private posService: Pos006Service) {}

  @Get()
  Hello() {
    return this.posService.Hello()
  }
}
