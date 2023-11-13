import { Injectable } from '@nestjs/common';
import { Tenant } from '../tenant.schema';

@Injectable()
export class TenantUtils {
  constructor() {}

  //query could be typed with GetAllTenantsDto
  async buildQuery(query: Partial<Tenant>) {
    const queryBuilt = {};

    if (query.first_name) {
      queryBuilt['first_name'] = new RegExp(query.first_name, 'i');
    }

    if (query.last_name) {
      queryBuilt['last_name'] = new RegExp(query.last_name, 'i');
    }

    /* if (query['start_date']) {
      queryBuilt['move_in_date'] = {
        $gte: query.move_in_date,
      };
    }

    if (query['end_date']) {
      queryBuilt['move_in_date'] = {
        $lte: query.move_in_date,
      };
    } */

    return queryBuilt;
  }
}
