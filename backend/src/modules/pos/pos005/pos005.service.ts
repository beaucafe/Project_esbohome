import { Injectable } from '@nestjs/common'
import { Pos005Repository } from './pos005.repository'

@Injectable()
export class Pos005Service {
  constructor(private sv: Pos005Repository) {}
  Hello() {
    return { message: 'Hello Pos005 Service!!' }
  }

  Test() {
    return 'test'
  }
}
