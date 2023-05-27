import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DomainJobService } from './domain-job.service';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule, HttpModule],
  providers: [DomainJobService],
})
export class DomainJobModule {}
