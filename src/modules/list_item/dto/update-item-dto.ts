import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateListItemDto {
  @ApiProperty({ description: 'The name of the list item.', required: false })
  @IsString()
  @IsOptional()
  name?: string;
}
