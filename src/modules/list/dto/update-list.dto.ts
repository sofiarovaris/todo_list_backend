import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { IsHexColor } from '../../../validators/ishexcolor';

export class UpdateListDto {
  @ApiProperty({ description: 'The name of the list.', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The color of the list in hex format.',
    required: false,
  })
  @IsHexColor()
  @IsOptional()
  color?: string;
}
