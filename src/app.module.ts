import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DomainJobModule } from './domain-job/domain-job.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [ScheduleModule.forRoot(), DomainModule, DomainJobModule],
})
export class AppModule {}
