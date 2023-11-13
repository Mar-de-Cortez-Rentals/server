import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './tenant.schema';
import { TenantService } from './tenant.service';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async create(@Body() createTenantDto: CreateTenantDto): Promise<Tenant> {
    return this.tenantService.create(createTenantDto);
  }

  @Get('/:offset/:take')
  async findAll(
    @Param('offset') offset: number,
    @Param('take') take: number,

    //Dont know if this is the best way to do this, could be GetAllTenantsDto
    @Body() body: Partial<Tenant>,
  ): Promise<Tenant[]> {
    return this.tenantService.findAll(offset, take, body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Tenant> {
    return this.tenantService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTenantDto: UpdateTenantDto,
  ): Promise<Tenant> {
    return this.tenantService.update(id, updateTenantDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Tenant> {
    return this.tenantService.remove(id);
  }
}
