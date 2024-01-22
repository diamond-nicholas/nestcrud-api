import { Module, OnModuleInit } from '@nestjs/common';
import { ServiceModule } from './service/service.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [ServiceModule],
})
export class DatabaseModule extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
