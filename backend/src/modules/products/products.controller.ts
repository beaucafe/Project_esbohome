import { Controller, Get } from '@nestjs/common'

@Controller()
export class ProductsController {
  @Get()
  getHello(): string {
    return 'Hello Production !!'
  }
}
