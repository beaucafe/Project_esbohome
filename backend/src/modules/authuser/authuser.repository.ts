import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common'

import { UserDto } from 'src/models/dto/user.dto'
import { User } from 'src/types/user'
import { Payload } from 'src/types/payload'

@Injectable()
export class AuthuserRepository {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  getHello(): string {
    return 'Hello AuthUser!!!!'
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find()
  }

  async createUser(userDto: UserDto) {
    const { name, email, password, role } = userDto
    const error = {
      statuscode: HttpStatus.BAD_REQUEST,
      message: '',
    }
    const checkEmail = await this.userModel
      .findOne({ email: email })
      .select('email')
    const checkUser = await this.userModel
      .findOne({ name: name })
      .select('name')
    if (checkEmail) {
      error.message = 'อีเมลนี้ผู้มีใช้งานแล้ว'
      // return error
      throw new HttpException(error.message, error.statuscode)
      // throw new BadRequestException({
      //   message: 'อีเมลนี้ผู้มีใช้งานแล้ว',
      //   // eng: 'Email already exists',
      // })
    }

    if (checkUser) {
      error.message = 'ชื่อนี้ผู้มีใช้งานแล้ว'
      // return error
      throw new HttpException(error.message, error.statuscode)
      // throw new HttpException('ชื่อนี้ผู้มีใช้งานแล้ว', HttpStatus.BAD_REQUEST)
      // throw new BadRequestException({
      //   message: 'ชื่อนี้ผู้มีใช้งานแล้ว',
      //   // eng: 'User already exists',
      // })
    }

    let user = new this.userModel(userDto)
    // user.name = name
    // user.email = email
    // user.role = role ? role : 'guest'
    // user.password = await user.encryptPassword(password)
    try {
      await user.save()
    } catch (error) {
      throw new InternalServerErrorException()
    }

    return user.sanitizeUser()
  }

  async userLogin(userDto: UserDto): Promise<User> {
    const { name, password } = userDto
    const isEmail = name.includes('@')

    try {
      // console.log(isEmail)
      const username = isEmail
        ? await this.userModel
            .findOne({ email: name })
            .select('email password role')
        : await this.userModel
            .findOne({ name: name })
            .select('name password role')

      if (!username) {
        //const error = `ไม่พบชื่อผู้ใช้นี้ในระบบ ${username}`
        throw new UnauthorizedException({
          th: `ไม่พบชื่อผู้ใช้ ${name} นี้ในระบบ `,
          eng: `Invalid credentials ${name}`,
        })
      } else {
        // ตรวจสอบรหัสผ่าน
        const chkPassword = await username.verifyPassword(password)
        if (!chkPassword) {
          throw new BadRequestException({
            th: `รหัสผ่านไม่ถูกต้อง`,
            eng: 'Invalid credentials',
          })
        }
      }

      // const senitize = username.toObject()
      // delete senitize.password
      return username.sanitizeUser()
    } catch (error) {
      throw new BadRequestException(JSON.stringify(error.message))
    }
  }

  async findByPayload(payload: Payload) {
    const { _id } = payload
    return await this.userModel.findOne({ _id })
  }
}
