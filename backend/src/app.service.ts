import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name)
  getHello(): string {
    return 'Hello World!'
  }

  // It's worked
  // @Cron('*/5 * * * * *')
  // TakeCron() {
  //   this.logger.debug('Called when the current is every 5 seconds')
  // }
}
