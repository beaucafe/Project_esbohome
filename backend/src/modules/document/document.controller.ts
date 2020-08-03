import { Controller, Get, Injectable, Post } from '@nestjs/common'
import { DocumentService } from './document.service'
import { IDoctype } from 'src/types/document.interface'

@Controller('document')
export class DocumentController {
  constructor(private docService: DocumentService) {}

  @Get()
  async getHello() {
    return this.docService.Test()
  }

  @Post('/doctype')
  async DoctypeLoading() {
    const result = await this.docService.DoctypeLoading()

    return result
  }
}
