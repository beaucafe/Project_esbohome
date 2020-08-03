import { Controller, Get } from '@nestjs/common'
import { Pos003Service } from './pos003.service'
import { dataSummary } from 'src/types/pos/data.summary'
import { IResponse } from 'src/types/pos/response.interface'

@Controller()
export class Pos003Controller {
  constructor(private posService: Pos003Service) {}

  @Get()
  Hello() {
    return this.posService.Hello()
  }

  @Get('/summary')
  async getSummary(): Promise<IResponse> {
    return await this.posService.dataSummary()
  }
}
