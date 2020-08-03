import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { AppService } from './app.service'
import { RoutesModule } from './modules/routes.module'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthuserModule } from './modules/authuser/authuser.module'
import { AdminModule } from './modules/admin/admin.module'
import { SharedModule } from './shared/shared.module'
import { DocumentModule } from './modules/document/document.module'
import { ScheduleModule } from '@nestjs/schedule'
import { PosModule } from './modules/pos/pos.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    }),
    ScheduleModule.forRoot(),
    AuthuserModule,
    AdminModule,
    SharedModule,
    RoutesModule,
    DocumentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(UserRoleMiddleware).forRoutes('admin')
  // }
}
