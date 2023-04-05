import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeDto {
    @ApiProperty()
    @IsString()
    indoor: string;

    @ApiProperty()
    @IsString()
    outdoor: string;

    @ApiProperty()
    @IsString()
    air: string;
}
