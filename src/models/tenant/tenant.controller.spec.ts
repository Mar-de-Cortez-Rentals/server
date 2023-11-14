import { Test, TestingModule } from '@nestjs/testing';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { Tenant } from './tenant.schema';

describe('TenantController', () => {
  let controller: TenantController;

  const tenantMock = {
    _id: '1',
    first_name: 'John',
    last_name: 'Doe',
    move_in_date: new Date(),
    contact_info: {
      phone: '1234567890',
      email: 'johndoe@example.com',
      job: 'Software Engineer',
      job_address: '123 Main St',
      job_phone: '1234567891',
    },
    leases: [],
  };

  let tenant = tenantMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenantController],
      providers: [
        TenantService,
        {
          provide: TenantService,
          useValue: TenantService,
        },
      ],
    }).compile();

    controller = module.get<TenantController>(TenantController);
  });

  describe('create', () => {
    it('should return a tenant', async () => {
      jest.spyOn(controller, 'create').mockResolvedValueOnce(tenantMock);
      const result = await controller.create(tenant);
      expect(result).toBe(tenantMock);
    });
  });

  describe('findAll', () => {
    it('should return an array of tenants', async () => {
      const offset = 0;
      const take = 10;

      const tenants: Tenant[] = [tenant];
      jest.spyOn(controller, 'findAll').mockResolvedValueOnce(tenants);

      expect(await controller.findAll(offset, take)).toBe(tenants);
    });
  });

  describe('findOne', () => {
    it('should return a tenant', async () => {
      const id = tenant._id;

      jest.spyOn(controller, 'findOne').mockResolvedValueOnce(tenant);

      expect(await controller.findOne(id)).toBe(tenantMock);
    });
  });

  describe('update', () => {
    it('should return a tenant', async () => {
      const id = tenant._id;
      const updatedTenant = tenant;
      updatedTenant.first_name = 'Jane';

      jest.spyOn(controller, 'update').mockResolvedValueOnce(tenant);

      expect((await controller.update(id, updatedTenant)).first_name).toBe(
        'Jane',
      );
    });
  });

  describe('remove', () => {
    it('should return a tenant', async () => {
      const id = tenant._id;
      const resolved = { tenant: tenant, success: true };
      jest.spyOn(controller, 'remove').mockResolvedValueOnce(resolved);

      expect(await controller.remove(id)).toBe(resolved);
    });
  });
});
