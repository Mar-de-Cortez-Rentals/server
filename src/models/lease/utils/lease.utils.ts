import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tenant } from 'src/models/tenant/tenant.schema';
import { Lease } from '../lease.schema';

@Injectable()
export class LeaseUtils {
  constructor(@InjectModel(Tenant.name) private tenantModel: Model<Tenant>) {}

  //query could be typed with GetAllTenantsDto
  async buildQuery(query: Partial<Lease>) {
    const queryBuilt = {};

    if (query['tenant_name']) {
      const tenantName = query['tenant_name'];

      // Using a regular expression to match either first name or last name
      const nameRegex = new RegExp(tenantName, 'i');

      const tenants = await this.tenantModel
        .find({
          $or: [{ first_name: nameRegex }, { last_name: nameRegex }],
        })
        .exec();

      // Extracting the _id from the found tenant(s)
      const tenantIds = tenants.map((tenant) => tenant._id);

      // Use the found tenant IDs in the lease query
      queryBuilt['tenant'] = { $in: tenantIds };
    }

    return queryBuilt;
  }
}
