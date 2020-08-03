import { Injectable } from '@nestjs/common'

@Injectable()
export class Pos006Service {
  Hello() {
    return { message: 'Hello Pos006 Service!!' }
  }
}
