import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsHexColor } from '../../../validators/ishexcolor';

export class CreateListDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsHexColor()
  @IsNotEmpty()
  color: string;
}
