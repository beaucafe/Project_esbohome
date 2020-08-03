import { Module } from '@nestjs/common'
import { DocumentController } from './document.controller'
import { DocumentService } from './document.service'
import { MongooseModule } from '@nestjs/mongoose'
import { DoctypeSchema } from 'src/models/document/doctype.schema'
import { DocrunSchema } from 'src/models/document/docrun.schema'
import { DocdetailSchema } from 'src/models/document/docdetail.schema'
import { DocumentRepository } from './document.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Doctypes', schema: DoctypeSchema },
      { name: 'Docruns', schema: DocrunSchema },
      { name: 'Docinfos', schema: DocrunSchema },
      { name: 'Docdetails', schema: DocdetailSchema },
    ]),
  ],
  controllers: [DocumentController],
  providers: [DocumentService, DocumentRepository],
})
export class DocumentModule {}
