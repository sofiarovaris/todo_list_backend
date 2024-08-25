import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { IsHexColor } from '../../../validators/ishexcolor';

export class UpdateListDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsHexColor()
  @IsOptional()
  color?: string;
}
