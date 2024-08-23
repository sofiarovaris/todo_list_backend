import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateListItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
