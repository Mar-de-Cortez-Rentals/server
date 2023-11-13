import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { UpdateLeaseDto } from './dto/update-lease.dto';
import { Lease } from './lease.schema';
import { LeaseService } from './lease.service';

@Controller('lease')
export class LeaseController {
  constructor(private readonly leaseService: LeaseService) {}

  @Post()
  async create(@Body() createLeaseDto: CreateLeaseDto) {
    return this.leaseService.create(createLeaseDto);
  }

  @Get('/:offset/:take')
  async findAll(
    @Param('offset') offset: number,
    @Param('take') take: number,
    @Body() body: Partial<Lease>,
  ) {
    return this.leaseService.findAll(offset, take, body);
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
