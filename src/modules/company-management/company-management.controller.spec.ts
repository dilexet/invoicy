import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { classes } from '@automapper/classes';
import { getMapperToken } from '@automapper/nestjs';
import { createMapper } from '@automapper/core';
import { v4 as uuidv4 } from 'uuid';
import { validate } from 'class-validator';
import { CompanyEntity } from '../../database';
import { CompanyViewModel } from './view-model/company.view-model';
import { CompanyManagementController } from './company-management.controller';
import { CompanyManagementService } from './company-management.service';
import { CreateCompanyInfoDto } from './dto/create-company-info.dto';

export const createMockCompany = (
  name: string,
  address: string,
  phone: string,
): CompanyViewModel => {
  const company = new CompanyViewModel();
  company.id = uuidv4();
  company.name = name;
  company.address = address;
  company.phone = phone;
  return company;
};

const mockCompanies: CompanyViewModel[] = [
  createMockCompany('Apple Inc.', 'Cupertino, CA, USA', '+1-408-996-1010'),
  createMockCompany(
    'Microsoft Corporation',
    'Redmond, WA, USA',
    '+1-425-882-8080',
  ),
  createMockCompany('Amazon.com Inc.', 'Seattle, WA, USA', '+1-206-266-1000'),
  createMockCompany(
    'Alphabet Inc. (Google)',
    'Mountain View, CA, USA',
    '+1-650-253-0000',
  ),
  createMockCompany('Facebook, Inc.', 'Menlo Park, CA, USA', '+1-650-308-7300'),
];

describe('CompanyManagementController', () => {
  let controller: CompanyManagementController;
  let service: CompanyManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyManagementController],
      providers: [
        {
          provide: CompanyManagementService,
          useValue: {
            getAllAsync: jest.fn(),
            createAsync: jest.fn(),
          },
        },
        {
          provide: getMapperToken(),
          useValue: createMapper({
            strategyInitializer: classes(),
          }),
        },
        {
          provide: getRepositoryToken(CompanyEntity),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CompanyManagementController>(
      CompanyManagementController,
    );

    service = module.get<CompanyManagementService>(CompanyManagementService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new company', async () => {
      const createDto: CreateCompanyInfoDto = {
        name: 'Twelvedevs',
        address: '101 Main Street, San Francisco, CA 94105',
        phone: '+375256669777',
      };

      const mockCreatedCompany: CompanyViewModel = {
        id: uuidv4(),
        ...createDto,
      };

      jest.spyOn(service, 'createAsync').mockResolvedValue(mockCreatedCompany);

      const result = await controller.create(createDto);

      expect(result).toEqual(mockCreatedCompany);
      expect(service.createAsync).toHaveBeenCalledWith(createDto);
    });

    it('should handle validation error: company name can not be empty', async () => {
      const createDto: CreateCompanyInfoDto = {
        name: '',
        address: '101 Main Street, San Francisco, CA 94105',
        phone: '+375256669777',
      };

      try {
        const res = await validate(createDto);
        console.log(res);
      } catch (error) {
        console.log(error);
        expect(error).toBe('');
      }
    });
  });

  describe('getAll', () => {
    it('should return an array of companies', async () => {
      jest.spyOn(service, 'getAllAsync').mockResolvedValue(mockCompanies);

      const result = await controller.getAll();

      expect(result).toEqual(mockCompanies);
    });

    it('should return an array of companies filtered by company name', async () => {
      const companyName = 'Inc.';
      const mockCompaniesFiltered = mockCompanies.filter((x) =>
        x.name.includes(companyName),
      );
      jest
        .spyOn(service, 'getAllAsync')
        .mockResolvedValue(mockCompaniesFiltered);

      const result = await controller.getAll(companyName);

      expect(result).toEqual(mockCompaniesFiltered);
      expect(service.getAllAsync).toHaveBeenCalledWith(companyName);
    });
  });
});
