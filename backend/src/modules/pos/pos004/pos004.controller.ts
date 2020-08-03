import { Controller, Get } from '@nestjs/common'
import { Pos004Service } from './pos004.service'
import { dataSummary } from 'src/types/pos/data.summary'
import { IResponse } from 'src/types/pos/response.interface'

@Controller()
export class Pos004Controller {
  constructor(private posService: Pos004Service) {}

  @Get()
  Hello() {
    return this.posService.Hello()
  }

  @Get('/summary')
  async getSummary(): Promise<IResponse> {
    return this.posService.dataSummary()
  }
}
