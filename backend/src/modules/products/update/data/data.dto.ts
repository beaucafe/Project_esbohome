import {
  IsBoolean,
  IsInt,
  IsMongoId,
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
} from 'class-validator'
import { IYYMMDD } from 'src/libs/datetostring/date.type'

export class PosnameDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  name: string
}

export class SETTINGPOSDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  name: string

  start?: IYYMMDD

  stop?: IYYMMDD
}
