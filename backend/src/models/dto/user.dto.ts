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
  @IsNotEmpty()
  @IsString()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @MinLength(6)
  password: string
  role: string
}
