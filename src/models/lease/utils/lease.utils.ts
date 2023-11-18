import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tenant } from 'src/models/tenant/tenant.schema';
import { Lease } from '../lease.schema';

@Injectable()
export class LeaseUtils {
  constructor(
    @InjectModel(Tenant.name) private tenantModel: Model<Tenant>,
  ) /* @InjectModel(Property.name) private propertyModel: Model<Property>, */
  {}

  //query could be typed with GetAllTenantsDto
  async buildQuery(query: Partial<Lease>) {
    const queryBuilt = {};

    if (query['property_name']) {
      const propertyName = query['property_name'];

      const propertyRegex = new RegExp(propertyName, 'i');

      queryBuilt['property'] = propertyRegex;
    }

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

    if (query['lease_start_date']) {
      const leaseStartDate = query['lease_start_date'];
      queryBuilt['lease_start_date'] = {
        $gte: leaseStartDate[0],
        $lte: leaseStartDate[1],
      };
    }

    return queryBuilt;
  }
}
