import {
  Controller,
  Get,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  ServiceUnavailableException,
} from '@nestjs/common'
import { DataService } from './data.service'
import { PosnameDto, SETTINGPOSDto } from './data.dto'
import { ISummaryByPOS } from 'src/models/pos/posdata.interface'
import { ISETTIME } from 'src/libs/datetostring/date.type'

@Controller()
export class DataController {
  constructor(private service: DataService) {}

  // @Get('/posconfig')
  // Posconfig() {
  //   return this.service.getPosconfig()
  // }
  @Post()
  pHello() {
    return { message: 'Hello data!' }
  }

  @Get()
  gHello() {
    return { message: 'Hello data!' }
  }

  @Post('/test/dailysummary')
  gcontrol(@Body() posname: PosnameDto) {
    return this.service.tablepos(posname)
  }

  @Get('/test')
  pcontrol() {
    return this.service.test()
  }

  @Post('/test')
  dailyTest(@Body() posname: SETTINGPOSDto) {
    const { name } = posname
    try {
      if (!posname.start && posname.stop)
        throw new Error(
          'Error start, กำหนดเวลาเริ่มต้นไม่ถูกต้อง, หรือปล่อยว่างไว้!',
        )

      if (posname.start && !posname.stop)
        throw new Error(
          'Error stop, กำหนดเวลาสิ้นสุดไม่ถูกต้อง, หรือปล่อยว่างไว้!',
        )

      if (!posname.start && !posname.stop) return this.service.dailyTest(name)

      const { start, stop } = posname
      const stime = { start, stop }

      return this.service.dailyTest(name, stime)
    } catch (error) {
      return new ServiceUnavailableException(error.message)
    }
  }

  @Post('/add/poscontrol')
  @UsePipes(ValidationPipe)
  addPoscontrol(@Body() posname: PosnameDto) {
    const { name } = posname
    console.log(`\nrequest : { name : ${name} }`)

    return this.service.manualAdjPoscontrol(posname)
  }

  @Post('/add/paymenttype')
  addTablePaymentType() {
    return this.service.AddtablePaymentType()
  }

  @Post('/update/posbypos')
  @UsePipes(ValidationPipe)
  updatePosByPos(@Body() posname: SETTINGPOSDto) {
    const { name } = posname
    try {
      if (!posname.start && posname.stop)
        throw new Error(
          'Error start, กำหนดเวลาเริ่มต้นไม่ถูกต้อง, หรือปล่อยว่างไว้!',
        )

      if (posname.start && !posname.stop)
        throw new Error(
          'Error stop, กำหนดเวลาสิ้นสุดไม่ถูกต้อง, หรือปล่อยว่างไว้!',
        )

      if (!posname.start && !posname.stop) return this.service.dailyTest(name)

      // const { start, stop } = posname
      const stime = { start: posname.start, stop: posname.stop }

      return this.service.dailyTest(name, stime)
    } catch (error) {
      return new ServiceUnavailableException(error.message)
    }
  }
  // updatePosdataByPosName(@Body() posname: PosnameDto) {
  //   const { name } = posname
  //   // console.log(`\nrequest : { name : ${name} }`)

  //   return this.service.updatePosdataByPos(posname)
  // }

  @Post('/update/v2/posbypos')
  @UsePipes(ValidationPipe)
  updatePosdataByPosNameV2(@Body() posname: PosnameDto) {
    const { name } = posname
    // console.log(`\nrequest : { name : ${name} }`)

    return this.service.updatePosdataByPosV2(posname)
  }

  //  month
  @Post('/month/test')
  testMonth(@Body() posname: PosnameDto): Promise<ISummaryByPOS> {
    return this.service.getSummaryMonth(posname)
  }
}
