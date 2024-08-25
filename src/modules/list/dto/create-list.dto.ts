import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsHexColor } from '../../../validators/ishexcolor';

export class CreateListDto {
  @ApiProperty({ description: 'The name of the list.' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The color of the list in hex format.' })
  @IsHexColor()
  @IsNotEmpty()
  color: string;
}
