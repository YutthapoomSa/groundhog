import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeDto {
    @ApiProperty()
    @IsString()
    type_name: string;

    @ApiProperty()
    @IsString()
    iframe_url: string;
}
