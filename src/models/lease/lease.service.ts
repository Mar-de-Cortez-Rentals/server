import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { UpdateLeaseDto } from './dto/update-lease.dto';
import { Lease } from './lease.schema';
import { LeaseUtils } from './utils/lease.utils';
@Injectable()
export class LeaseService {
  constructor(
    @InjectModel(Lease.name) private readonly leaseModel: Model<Lease>,
    private readonly leaseUtils: LeaseUtils,
  ) {}

  async create(createLeaseDto: CreateLeaseDto): Promise<Lease> {
    const lease = new this.leaseModel(createLeaseDto);
    return lease.save();
  }

  async findAll(
    offset: number,
    take: number,
    query: Partial<Lease>,
  ): Promise<{ data: Lease[]; count: number }> {
    return {
      data: await this.leaseModel
        .find(await this.leaseUtils.buildQuery(query))
        .populate('tenant')
        .populate('property')
        .exec(),
      count: await this.leaseModel.countDocuments(query),
    };
  }

  async findOne(id: number): Promise<Lease> {
    return this.leaseModel.findById(id).populate('tenant').exec();
  }

  async update(id: number, updateLeaseDto: UpdateLeaseDto): Promise<Lease> {
    const updatedLease = await this.leaseModel.findByIdAndUpdate(
      id,
      updateLeaseDto,
    );
    return updatedLease;
  }

  async remove(id: number): Promise<Lease> {
    const deletedLease = await this.leaseModel.findByIdAndRemove(id);
    return deletedLease;
  }
}
