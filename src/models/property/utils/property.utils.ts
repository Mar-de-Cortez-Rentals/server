import { Injectable } from '@nestjs/common';

@Injectable()
export class PropertyUtils {
  constructor() /* @InjectModel(Lease.name) private readonly leaseModel: Model<Lease>, */ //If needed to search by some sort of relationship in the future
  {}

  async buildQuery(query: Partial<any>) {
    const queryBuilt = {};

    if (query.name) {
      queryBuilt['name'] = new RegExp(query.name, 'i');
    }

    if (query.address) {
      queryBuilt['address'] = new RegExp(query.address, 'i');
    }

    if (query.type) {
      queryBuilt['type'] = new RegExp(query.type, 'i');
    }

    if (query.rents) {
      queryBuilt['rents'] = { $in: query.rents };
    }

    return queryBuilt;
  }
}
