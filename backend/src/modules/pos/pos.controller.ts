import { Controller, Get } from '@nestjs/common'
import { PosService } from './pos.service'

@Controller()
export class PosController {
  constructor(private posSevice: PosService) {}

  @Get()
  Hello() {
    return this.posSevice.Hello()
  }

  @Get('/test')
  Test() {
    return 'Test'
  }

  // @Get('/r')
  // async Run() {
  //   const q1 = await this.posSevice.runQuery()
  //   const q2 = await this.posSevice.runQuery2()
  //   return { q1, q2 }
  // }

  @Get('r3')
  async R3() {
    return await this.posSevice.run4()
  }
}
