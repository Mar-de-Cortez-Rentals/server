import { Injectable } from '@nestjs/common';
import { GetAllPaymentDto } from '../dto/getAll-payment.dto';

@Injectable()
export class PaymentUtils {
  constructor() {}

  async buildQuery(query: Partial<GetAllPaymentDto>) {
    const queryBuilt = {};

    if (query['payment_date'] !== undefined && query['payment_date'].length) {
      query['payment_date'] = {};

      if (query['payment_date'][0] !== 'null')
        query['payment_date']['$gte'] = query['payment_date'][0];

      if (query['payment_date'][1] !== 'null')
        query['payment_date']['$lte'] = query['payment_date'][1];
    }

    if (query['tenant_Name']) {
      const tenantNameRegex = new RegExp(query['tenant_Name'], 'i');
      queryBuilt['tenant.name'] = tenantNameRegex;
    }

    //Add more if needed

    return queryBuilt;
  }
}
