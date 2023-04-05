import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateSiteDto {
    @ApiProperty()
    @IsString()
    site_name: string;

    @ApiProperty()
    @IsNumber()
    coor_lat: number;

    @ApiProperty()
    @IsNumber()
    coor_lon: number;
}
