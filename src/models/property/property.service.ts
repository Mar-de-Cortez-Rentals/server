import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './property.schema';
import { PropertyUtils } from './utils/property.utils';

@Injectable({})
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<Property>,
    private propertyUtils: PropertyUtils,
  ) {}

  create(createPropertyDto: CreatePropertyDto) {
    return this.propertyModel.create(createPropertyDto);
  }

  async findAll(
    offset: number,
    take: number,
    query: Partial<Property>,
  ): Promise<Property[]> {
    return this.propertyModel
      .find(await this.propertyUtils.buildQuery(query))
      .skip(offset)
      .limit(take);
  }

  async findOne(id: number): Promise<Property> {
    return this.propertyModel.findById(id).populate('rents').exec();
  }

  async update(
    id: number,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    const updatedProperty = this.propertyModel.findByIdAndUpdate(
      id,
      updatePropertyDto,
    );

    return updatedProperty;
  }

  async remove(id: string): Promise<{ property: Property; success: boolean }> {
    const property = await this.propertyModel.findById(id);
    if (!property) {
      return { property: null, success: false };
    }

    const deletedTenant = await this.propertyModel.deleteOne({ _id: id });

    if (deletedTenant.deletedCount < 1) {
      return { property: null, success: false };
    }
    return { property: property, success: true };
  }
}
