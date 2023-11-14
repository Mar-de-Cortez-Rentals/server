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

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const property = new this.propertyModel(createPropertyDto);
    return property.save();
  }

  async findAll(
    offset: number,
    take: number,
    body: Partial<Property>,
  ): Promise<Property[]> {
    return this.propertyModel
      .find(await this.propertyUtils.buildQuery(body))
      .skip(offset)
      .limit(take);
  }

  findOne(id: number) {
    return this.propertyModel.findById(id).populate('rents').exec();
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    const updatedProperty = this.propertyModel.findByIdAndUpdate(
      id,
      updatePropertyDto,
    );

    return updatedProperty;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
