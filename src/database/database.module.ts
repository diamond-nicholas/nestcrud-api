import { Global, Module, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from './database.service';

@Global()
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
