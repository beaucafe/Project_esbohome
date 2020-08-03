import { Injectable } from '@nestjs/common'
import { MssqlService } from 'src/utilities/mssql/mssql.service'
import { UnitRepository } from './unit.repository'
import { Unit } from 'src/types/unit'
// import { InjectConnection } from '@nestjs/mongoose'
// import { Connection } from 'mongoose'

@Injectable()
export class UnitService {
  constructor(
    // @InjectConnection() private connection: Connection,
    private unitReps: UnitRepository,
  ) {}

  findUnit() {
    return this.unitReps.findAllUnitFromMssql()
  }

  dropCollection(collectionName) {
    return this.unitReps.dropCollection(collectionName)
  }

  createUnit() {
    return this.unitReps.createUnitTable()
  }
}
