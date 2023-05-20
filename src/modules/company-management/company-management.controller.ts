import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ExceptionModel } from '../../model/exception.model';
import { CompanyManagementService } from './company-management.service';
import { CreateCompanyInfoDto } from './dto/create-company-info.dto';
import { CompanyViewModel } from './view-model/company.view-model';

@ApiTags('Company management')
@Controller('api/company-management')
export class CompanyManagementController {
  constructor(
    private readonly companyManagementService: CompanyManagementService,
  ) {}

  @Post()
  @ApiBody({
    type: CreateCompanyInfoDto,
  })
  @ApiCreatedResponse({
    description: 'The company information has been successfully created.',
    type: CompanyViewModel,
  })
  @ApiBadRequestResponse({
    description: 'The company information was not created.',
    type: ExceptionModel,
  })
  async create(
    @Body() createCompanyManagementDto: CreateCompanyInfoDto,
  ): Promise<CompanyViewModel> {
    return await this.companyManagementService.createAsync(
      createCompanyManagementDto,
    );
  }
}
