import { ApiProperty } from '@nestjs/swagger';
import { IsFQDN, IsNotEmpty } from 'class-validator';

export class CreateDomainDto {
  @ApiProperty({ example: 'google.com', description: 'Domain' })
  @IsFQDN()
  @IsNotEmpty()
  path: string;
}
