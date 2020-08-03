import { Controller, Get, Post } from '@nestjs/common'
import { UpdateService } from './update.service'

@Controller()
export class UpdateController {
  constructor(private updateService: UpdateService) {}

  @Get()
  Hello() {
    return this.updateService.Hello()
  }

  @Post('/dept')
  CreateAndUpdate_department() {
    return this.updateService.CreateAndUpdate()
  }

  @Post('/posconfig')
  Posconfig() {
    return this.updateService.Posconfig()
  }

  // @Get('/add')
  // Add() {
  //   return this.updateService.add()
  // }
  // @Get('/del')
  // Remove() {
  //   return this.updateService.remove()
  // }
  // @Get('/show')
  // Show() {
  //   return this.updateService.show()
  // }
}
