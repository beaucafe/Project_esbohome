import { Controller, Get } from '@nestjs/common'
import { Pos002Service } from './pos002.service'
import { dataSummary } from 'src/types/pos/data.summary'
import { IResponse } from 'src/types/pos/response.interface'

@Controller()
export class Pos002Controller {
  constructor(private posService: Pos002Service) {}

  @Get()
  Hello() {
    return this.posService.Hello()
  }

  @Get('/summary')
  async getSummary(): Promise<IResponse> {
    return this.posService.dataSummary()
  }
}
