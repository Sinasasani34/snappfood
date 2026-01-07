import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('payment')
@ApiTags("Payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

}
