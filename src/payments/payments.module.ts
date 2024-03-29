import { Module } from '@nestjs/common';
import { PaymentsController } from './controller/payments/payments.controller';

@Module({
  controllers: [PaymentsController]
})
export class PaymentsModule {}
