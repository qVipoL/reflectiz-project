import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DomainController } from './domain.controller';
import { DomainService } from './domain.service';

@Module({
  imports: [PrismaModule],
  controllers: [DomainController],
  providers: [DomainService],
})
export class DomainModule {}
