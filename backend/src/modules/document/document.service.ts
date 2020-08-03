import { Injectable } from '@nestjs/common'
import { DocumentRepository } from './document.repository'
import { IDoctype } from 'src/types/document.interface'

@Injectable()
export class DocumentService {
  constructor(private db: DocumentRepository) {}

  Hello(): object {
    return { statusCode: 200, message: 'Hello document!!!!' }
  }

  async Test(): Promise<any> {
    return await this.db.testCreate()
  }

  async DoctypeLoading() {
    const result = await this.db.DoctypeDataLoading().then((r) => this.loop(r))

    return result
  }

  async loop(data) {
    let result = {
      message: 'Data loading, successfully.',
      data: {
        created: 0,
        updated: 0,
      },
    }
    let x = 1,
      c = 1
    for (let i = 0; i < data.length; i++) {
      const ex = await data[i].then((r) => r.message)
      if (ex !== 0) {
        result.data.created = c++
      } else {
        result.data.updated = x++
      }
    }
    return result
  }
}
