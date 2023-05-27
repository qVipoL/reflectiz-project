import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDomainDto } from './dto/create-domain.dto';
import { GetDomainDto } from './dto/get-domain.dto';

@Injectable()
export class DomainService {
  constructor(private readonly prisma: PrismaService) {}

  async getByDomain(dto: GetDomainDto) {
    return this.prisma.domain.findFirst({
      where: {
        path: dto.path,
      },
    });
  }

  async getNewDomainEnqueueIfNotExists(dto: GetDomainDto) {
    const domain = await this.getByDomain(dto);

    if (domain) return domain;

    await this.create({ path: dto.path });

    return {
      message:
        'The domain was added and is now being proccessed, please try again later...',
    };
  }

  async create(dto: CreateDomainDto) {
    const domain = await this.getByDomain(dto);

    if (domain) {
      throw new HttpException('Domain already exists', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.domain.create({
      data: {
        path: dto.path,
      },
    });
  }
}
