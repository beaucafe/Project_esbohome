import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthuserRepository } from './authuser.repository'

import { UserDto } from 'src/models/dto/user.dto'
import { AuthuserService } from '../../shared/authuser.service'
import { Payload } from 'src/types/payload'
import { User } from 'src/types/user'

@Controller('auth')
export class AuthuserController {
  constructor(
    private authUser: AuthuserRepository,
    private authService: AuthuserService,
  ) {}
  @Get()
  getHello(): string {
    return this.authUser.getHello()
  }

  @Get('/showall')
  async findAllUsers(): Promise<User[]> {
    return this.authUser.findAll()
  }

  @Post()
  postHello(): string {
    return this.authUser.getHello()
  }

  @Post(['/singup', '/register'])
  @UsePipes(ValidationPipe)
  async singUp(@Body() userCredential: UserDto) {
    return await this.authUser.createUser(userCredential)
  }

  @Post(['/singin', '/login'])
  async singIn(@Body() userCredential: UserDto) {
    // return this.authUser.userLogin(userCredential)
    const user = await this.authUser.userLogin(userCredential)
    //console.log(user)

    const payload: Payload = {
      _id: user._id,
      role: user.role,
    }
    const token = await this.authService.signPayload(payload)

    return { 'Authorizatrized token': token }
  }
}
