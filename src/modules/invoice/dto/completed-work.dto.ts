import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CompletedWorkDto {
  @ApiProperty({
    type: String,
    default: 'Title 1',
    description: 'Work title',
  })
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  title: string;

  @ApiProperty({
    type: Number,
    minimum: 0.01,
    default: 1,
    description: 'Work price',
  })
  @Min(0.01)
  @IsNumber()
  @AutoMap()
  price: number;
}
