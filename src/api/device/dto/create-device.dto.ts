import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
// import moment = require('moment-timezone')

export class SiteData {
    // @ApiProperty()
    // @IsOptional()
    // site_id: string;

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
export class TypeData {
    // @ApiProperty()
    // @IsOptional()
    // type_id: string;

    @ApiProperty()
    @IsString()
    type_name: string;
   
    @ApiProperty()
    @IsString()
    iframe_url: string;
}

export class CreateResDeviceDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    serial_number: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    device_name: string;

    @ApiProperty()
    @IsNumber()
    pm2: number;

    @ApiProperty()
    @IsNumber()
    pm10: number;

    @ApiProperty()
    @IsNumber()
    heat_index: number;

    @ApiProperty()
    @IsNumber()
    humidity: number;

    @ApiProperty()
    @IsNumber()
    temperature: number;

    @ApiProperty()
    @IsNumber()
    altitude: number;

    @ApiProperty()
    @IsNumber()
    speed: number;

    @ApiProperty()
    @IsNumber()
    light_detection: number;

    @ApiProperty()
    @IsNumber()
    noise: number;

    @ApiProperty()
    @IsNumber()
    carbon_dioxide: number;

    @ApiProperty()
    @IsNumber()
    battery: number;

    @ApiProperty()
    @IsString()
    date_data: string;

    @ApiProperty()
    @IsNumber()
    coor_lat: number;

    @ApiProperty()
    @IsNumber()
    coor_lon: number;

    // @ApiProperty()
    // @IsOptional()
    // site_id: string;

    // @ApiProperty()
    // @IsOptional()
    // type_id: string;

    @ApiProperty({
        type: [SiteData],
    })
    site: SiteData[];

    @ApiProperty({
        type: [TypeData],
    })
    type: TypeData[];
}
// ─────────────────────────────────────────────────────────────────────────────

// export class SiteResData {
//     @ApiProperty()
//     _id: ObjectId;
//     @ApiProperty()
//     site_name: string;
//     @ApiProperty()
//     coor_lat: number;
//     @ApiProperty()
//     coor_lon: number;
// }

// export class TypeResData {
//     @ApiProperty()
//     _id: ObjectId;
//     @ApiProperty()
//     indoor: string;
//     @ApiProperty()
//     outdoor: string;
//     @ApiProperty()
//     air: string;
// }

// export class CreateResDeviceDTOData {
//     @ApiProperty()
//     id: ObjectId;
//     @ApiProperty()
//     serial_number: string;
//     @ApiProperty()
//     device_name: string;
//     @ApiProperty()
//     pm2: number;
//     @ApiProperty()
//     pm10: number;
//     @ApiProperty()
//     heat_index: number;
//     @ApiProperty()
//     humidity: number;
//     @ApiProperty()
//     temperature: number;
//     @ApiProperty()
//     altitude: number;
//     @ApiProperty()
//     speed: number;
//     @ApiProperty()
//     light_detection: number;
//     @ApiProperty()
//     noise: number;
//     @ApiProperty()
//     carbon_dioxide: number;
//     @ApiProperty()
//     battery: number;
//     @ApiProperty({ example: moment().tz('Asia/Bangkok').format('DD MMM YYYY, HH:mm:ss') })
//     date_data: string;
//     @ApiProperty({
//         type: () => [SiteResData],
//     })
//     @IsArray()
//     siteList: SiteResData[];
//     @ApiProperty({
//         type: () => [TypeResData],
//     })
//     @IsArray()
//     typeList: TypeResData[];
// }

// export class CreateResDeviceDTO {
//     @ApiProperty({
//         enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
//         description: 'รหัสสถานะ',
//     })
//     resCode: ResStatus;

//     @ApiProperty({
//         type: () => CreateResDeviceDTOData,
//         description: 'ข้อมูล',
//     })
//     resData: CreateResDeviceDTOData;

//     @ApiProperty({
//         description: 'ข้อความอธิบาย',
//     })
//     msg: string;

//     constructor(resCode: ResStatus, msg: string, datas: DeviceDB) {
//         this.resCode = resCode;
//         this.msg = msg;
//         this.resData = new CreateResDeviceDTOData();

//         if (!!datas) {
//             this.resData.id = datas._id;
//             this.resData.device_name = datas.device_name;
//             this.resData.serial_number = datas.serial_number;
//             this.resData.pm2 = datas.pm2;
//             this.resData.pm10 = datas.pm10;
//             this.resData.heat_index = datas.heat_index;
//             this.resData.humidity = datas.humidity;
//             this.resData.temperature = datas.temperature;
//             this.resData.altitude = datas.altitude;
//             this.resData.speed = datas.speed;
//             this.resData.light_detection = datas.light_detection;
//             this.resData.noise = datas.noise;
//             this.resData.carbon_dioxide = datas.carbon_dioxide;
//             this.resData.battery = datas.battery;
//             this.resData.date_data = datas.date_data;
//             this.resData.siteList = [];
//             if (!!this.resData.siteList && this.resData.siteList.length > 0) {
//                 for (const iterator of this.resData.siteList) {
//                     const _site = new SiteResData();
//                     _site._id = iterator._id;
//                     _site.site_name = iterator.site_name;
//                     _site.coor_lat = iterator.coor_lat;
//                     _site.coor_lon = iterator.coor_lon;
//                     this.resData.siteList.push(_site);
//                 }
//             }
//             this.resData.typeList = [];
//             if (!!this.resData.typeList && this.resData.typeList.length > 0) {
//                 for (const iterator2 of this.resData.typeList) {
//                     const _type = new TypeResData();
//                     _type._id = iterator2._id;
//                     _type.indoor = iterator2.indoor;
//                     _type.outdoor = iterator2.outdoor;
//                     _type.air = iterator2.air;
//                     this.resData.typeList.push(_type);
//                 }
//             }
//         }
//     }
// }
