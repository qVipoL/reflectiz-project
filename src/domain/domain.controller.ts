import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DomainService } from './domain.service';
import { CreateDomainDto } from './dto/create-domain.dto';
import { GetDomainDto } from './dto/get-domain.dto';

@ApiTags('Domain')
@Controller('domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @ApiOperation({ summary: 'Get domain info by domain' })
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  @Get()
  getObjectByDomain(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      })
    )
    domainDto: GetDomainDto
  ) {
    return this.domainService.getNewDomainEnqueueIfNotExists(domainDto);
  }

  @ApiOperation({ summary: 'Create domain' })
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() createDomainDto: CreateDomainDto) {
    return this.domainService.create(createDomainDto);
  }
}
