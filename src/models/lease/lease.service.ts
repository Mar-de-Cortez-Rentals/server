import { Injectable } from '@nestjs/common';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { UpdateLeaseDto } from './dto/update-lease.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Lease } from './lease.schema';
import { Model } from 'mongoose';
@Injectable()
export class LeaseService {
  constructor(
    @InjectModel(Lease.name) private readonly leaseModel: Model<Lease>,
  ) {}

  async create(createLeaseDto: CreateLeaseDto): Promise<Lease> {
    const lease = new this.leaseModel(createLeaseDto);
    return lease.save();
  }

  async findAll(): Promise<Lease[]> {
    return this.leaseModel.find().populate('tenant').exec();
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
