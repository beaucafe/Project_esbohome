import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common'
import { UserRoleGuard } from 'src/guards/userRole.guard'
import { AuthGuard } from '@nestjs/passport'
import { LoggingInterceptor } from 'src/shared/logging.interceptor'
import { User } from 'src/types/user'
import { AuthuserRepository } from '../authuser/authuser.repository'

@Controller('admin')
// @UseInterceptors(LoggingInterceptor)
@UseGuards(AuthGuard('jwt'), UserRoleGuard)
export class AdminController {
  constructor(private authUser: AuthuserRepository) {}
  @Get()
  async getHello() {
    return 'Hello Admin page !!!!'
  }

  @Get('/showuser')
  async findAll(): Promise<User[]> {
    return this.authUser.findAll()
  }

  @Get('/delete')
  async useDel() {
    return 'Welcome deletting.'
  }
}
