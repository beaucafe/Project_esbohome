import {
  IsBoolean,
  IsInt,
  IsMongoId,
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
} from 'class-validator'

export class UnitDto {
  _id: number
  name: string
  quantity: number
}
