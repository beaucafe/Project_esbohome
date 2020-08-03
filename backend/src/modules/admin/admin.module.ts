import { Module } from '@nestjs/common'
import { AdminController } from './admin.controller'
import { SharedModule } from 'src/shared/shared.module'

@Module({
  imports: [SharedModule],
  controllers: [AdminController],
  providers: [],
})
export class AdminModule {}
