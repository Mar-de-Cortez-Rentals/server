import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LeaseService } from './lease.service';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { UpdateLeaseDto } from './dto/update-lease.dto';

@Controller('lease')
export class LeaseController {
  constructor(private readonly leaseService: LeaseService) {}

  @Post()
  async create(@Body() createLeaseDto: CreateLeaseDto) {
    return this.leaseService.create(createLeaseDto);
  }

  @Get()
  async findAll() {
    return this.leaseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.leaseService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLeaseDto: UpdateLeaseDto,
  ) {
    return this.leaseService.update(+id, updateLeaseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.leaseService.remove(+id);
  }
}
