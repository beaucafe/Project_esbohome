import { Module } from '@nestjs/common'
import { AuthuserController } from './authuser.controller'
import { JwtStrategy } from './jwt.strategy'
import { AuthuserService } from '../../shared/authuser.service'
import { SharedModule } from 'src/shared/shared.module'

@Module({
  //imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  imports: [SharedModule],
  controllers: [AuthuserController],
  providers: [JwtStrategy, AuthuserService],
  //exports: [JwtStrategy, AuthuserService],
})
export class AuthuserModule {}
