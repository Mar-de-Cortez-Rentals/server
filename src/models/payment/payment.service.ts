import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tenant } from '../tenant/tenant.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { PaymentUtils } from './utils/payment.utils';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
    private paymentUtils: PaymentUtils,
  ) {}

  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  async findAll(query: Partial<Payment>) {
    return this.paymentModel
      .find(await this.paymentUtils.buildQuery(query))
      .populate(Tenant.name)
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
