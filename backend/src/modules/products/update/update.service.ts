import { Injectable } from '@nestjs/common'
import { UpdateRepository } from './update.repository'

@Injectable()
export class UpdateService {
  constructor(private db: UpdateRepository) {}
  Hello() {
    return this.db.Hello()
  }

  CreateAndUpdate() {
    return this.db.CreateAndUpdate_Department()
  }

  Posconfig() {
    return this.db.CreateAndUpdate_Posconfig()
  }
}

// add(): void {
//   this.db.INCREMENT()
// }

// remove(): void {
//   this.db.DECREMENT()
// }

// show() {
//   return this.db.ShowState()
// }
