import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateListItemDto {
  @ApiProperty({ description: 'The name of the list item.' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
