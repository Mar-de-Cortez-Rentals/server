import { Property } from 'src/models/property/entities/property.entity';
import { Tenant } from 'src/models/tenant/entities/tenant.entity';
import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class Lease {
  @ObjectIdColumn()
  id: ObjectId;

  @Column((type) => Tenant)
  tenant: Tenant;

  @Column()
  property: Property;

  @Column()
  lease_start_date: Date;

  @Column()
  lease_end_date: Date;

  @Column()
  rent_plan: string;

  @Column()
  security_deposit: number;

  @Column()
  lease_terms: string;

  @Column()
  status: string;
}
