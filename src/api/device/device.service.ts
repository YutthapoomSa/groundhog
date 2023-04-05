import { Injectable, InternalServerErrorException, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import moment from 'moment';
import { Model, Types } from 'mongoose';
import { DeviceDB } from './../../entities/device.entity';
import { LogService } from './../../services/log.service';
import { ResStatus } from './../../share/enum/res-status.enum';
import { CreateResDeviceDTO, CreateResDeviceDto } from './dto/create-device.dto';

// moment.tz.setDefault('Asia/Bangkok');

// ───────────────────────────[สถานที่ประกาศ]───────────────────────────────────────────
const url = '';
const username = '';
const password = '';
const auth = {
    username: username,
    password: password,
};
// ─────────────────────────────────────────────────────────────────────────────

@Injectable()
export class DeviceService implements OnApplicationBootstrap {
    private logger = new LogService(DeviceService.name);

    constructor(
        @InjectModel(DeviceDB.name)
        private readonly deviceModel: Model<DeviceDB>,
    ) {}
    onApplicationBootstrap() {
        //
    }
    // ─────────────────────────────────────────────────────────────────────────────

    async create(createDeviceDto: CreateResDeviceDto) {
        const tag = this.create.name;
        try {
            if (!createDeviceDto) throw new Error('Device is required !!');

            const device = new this.deviceModel({
                serial_number: createDeviceDto.serial_number || null,
                device_name: createDeviceDto.device_name || null,
                pm2: createDeviceDto.pm2 || null,
                pm10: createDeviceDto.pm10 || null,
                heat_index: createDeviceDto.heat_index || null,
                humidity: createDeviceDto.humidity || null,
                temperature: createDeviceDto.temperature || null,
                altitude: createDeviceDto.altitude || null,
                speed: createDeviceDto.speed || null,
                light_detection: createDeviceDto.light_detection || null,
                noise: createDeviceDto.noise || null,
                carbon_dioxide: createDeviceDto.carbon_dioxide || null,
                battery: createDeviceDto.battery || null,
                date_data: moment().tz('asia/Bangkok').add(543, 'year').format('DD-MM-YYYY HH:mm:ss'),
                site_id: createDeviceDto.site_id || null,
                type_id: createDeviceDto.type_id || null,
            });
            const savedDevice = await device.save();
            return savedDevice;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
// async create(createDeviceDto: CreateResDeviceDto) {
//     const tag = this.create.name;
//     try {

//     } catch (error) {
//         throw new InternalServerErrorException(error);
//     }
// }
