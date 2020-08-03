import {
  IsBoolean,
  IsInt,
  IsMongoId,
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
} from 'class-validator'

export class UserDto {
  dtkey: Number
  dtcode: String
  dtthainame: String
  dtengname: String
  properties: Number
  runtype: Number
  prefix: String
  digit: Number
  doccode: String
  vatref: String
}
