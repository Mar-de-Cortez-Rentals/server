import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './property.entity';
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

  async findAll(offset: number, take: number, body: Partial<Property>) {
    return this.propertyModel
      .find(await this.propertyUtils.buildQuery(body))
      .skip(offset)
      .limit(take);
  }

  findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
