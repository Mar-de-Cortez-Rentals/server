import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './tenant.schema';

@Injectable()
export class TenantService {
  constructor(
    @InjectModel(Tenant.name)
    private readonly tenantModel: Model<Tenant>,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    createTenantDto.move_in_date = new Date();

    const tenant = new this.tenantModel(createTenantDto);
    return tenant.save();
  }

  async findAll(offset: number, take: number): Promise<Tenant[]> {
    return this.tenantModel.find().skip(offset).limit(take).exec();
  }

  async findOne(id: string): Promise<Tenant> {
    return this.tenantModel.findById(id).populate('contact_info').exec();
  }

  async update(id: string, updateTenantDto: UpdateTenantDto): Promise<Tenant> {
    const updatedTenant = await this.tenantModel.findByIdAndUpdate(
      id,
      updateTenantDto,
    );

    return updatedTenant;
  }

  async remove(id: string): Promise<{ tenant: Tenant; success: boolean }> {
    const tenant = await this.tenantModel.findById(id);
    if (!tenant) {
      return { tenant: null, success: false };
    }

    const deletedTenant = await this.tenantModel.deleteOne({ _id: id });

    if (deletedTenant.deletedCount < 1) {
      return { tenant: null, success: false };
    }
    return { tenant: tenant, success: true };
  }
}
