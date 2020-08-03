import { Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'

import { UserSchema } from '../models/user.schema'
import { AuthuserService } from './authuser.service'
import { LoggingInterceptor } from './logging.interceptor'
import { AuthuserRepository } from 'src/modules/authuser/authuser.repository'
import { MssqlService } from 'src/utilities/mssql/mssql.service'
// import { HttpExceptionFilter } from './http-exception.filter';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [
    AuthuserRepository,
    {
      provide: APP_FILTER,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [AuthuserRepository],
})
export class SharedModule {}
