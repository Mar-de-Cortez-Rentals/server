import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './property.schema';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    try {
      console.log(createPropertyDto);
      return this.propertyService.create(createPropertyDto);
    } catch (err) {
      console.log(err);
    }
  }

  @Get('/:offset/:take')
  findAll(
    @Param('offset') offset: number,
    @Param('take') take: number,
    //Dont know if this is the best way to do this, could be GetAllPropertiesDto
    @Query() query: Partial<Property>,
  ) {
    console.log(query);
    return this.propertyService.findAll(offset, take, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertyService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyService.remove(id);
  }
}
