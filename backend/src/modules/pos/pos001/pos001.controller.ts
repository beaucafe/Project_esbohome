import { Controller, Get } from '@nestjs/common'
import { Pos001Service } from './pos001.service'
import { dataSummary } from 'src/types/pos/data.summary'
import { IResponse } from 'src/types/pos/response.interface'

@Controller()
export class Pos001Controller {
  constructor(private posService: Pos001Service) {}

  @Get()
  Hello() {
    return this.posService.Hello()
  }

  @Get('/summary')
  async getSummary(): Promise<IResponse> {
    return this.posService.dataSummary()
  }
}
