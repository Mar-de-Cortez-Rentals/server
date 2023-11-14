import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lease } from 'src/models/lease/lease.schema';
import { Property } from '../property.schema';

@Injectable()
export class PropertyUtils {
  constructor(
    //If needed to search by some sort of relationship in the future
    @InjectModel(Lease.name) private readonly leaseModel: Model<Lease>,
  ) {}

  async buildQuery(query: Partial<Property>) {
    const queryBuilt = {};

    if (query.name) {
      queryBuilt['name'] = new RegExp(query.type, 'i');
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
