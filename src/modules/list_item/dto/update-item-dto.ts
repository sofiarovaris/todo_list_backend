import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateListItemDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;
}
