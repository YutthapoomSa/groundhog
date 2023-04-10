import { Injectable, InternalServerErrorException, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import moment from 'moment';
import { Model } from 'mongoose';
import { DeviceDB } from './../../entities/device.entity';
import { LogService } from './../../services/log.service';
import { ResStatus } from './../../share/enum/res-status.enum';
import { CreateResDeviceDto } from './dto/create-device.dto';

moment.tz.setDefault('Asia/Bangkok');

// ───────────────────────────[สถานที่ประกาศ]───────────────────────────────────────────
const url = 'https://3576-202-44-231-125.ngrok-free.app/groundhog/_doc/';
const username = 'elastic';
const password = '0123456789';
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

            const id_elk = createDeviceDto.serial_number
                ? String(createDeviceDto.serial_number + moment().format('YYYYMMDDHHmmss'))
                : moment().format('YYYYMMDDHHmmss');

            const device = new this.deviceModel({
                serial_number: createDeviceDto.serial_number || null,
                device_name: createDeviceDto.device_name || null,
                id_elk: id_elk,
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
            // ─────────────────────────────────────────────────────────────────────────────
            const device_elk = device;
            const deviceELK = {
                serial_number: device_elk.serial_number || null,
                device_name: device_elk.device_name || null,
                id_elk: device_elk.id_elk || null,
                pm2: device_elk.pm2 || null,
                pm10: device_elk.pm10 || null,
                heat_index: device_elk.heat_index || null,
                humidity: device_elk.humidity || null,
                temperature: device_elk.temperature || null,
                altitude: device_elk.altitude || null,
                speed: device_elk.speed || null,
                light_detection: device_elk.light_detection || null,
                noise: device_elk.noise || null,
                carbon_dioxide: device_elk.carbon_dioxide || null,
                battery: device_elk.battery || null,
                date_data: device_elk.date_data,
                site_id: device_elk.site_id || null,
                type_id: device_elk.type_id || null,
            };
            console.log('deviceELK => ', JSON.stringify(deviceELK, null, 2));
            // ─────────────────────────────────────────────────────────────────────────────
            await axios
                .put(url + id_elk, deviceELK, { auth })
                .then((results) => {
                    console.log('Result Axios: ', JSON.stringify(results.data, null, 2));
                })
                .catch((error) => {
                    console.log('Failed to fetch -> ', error);
                });
            // ─────────────────────────────────────────────────────────────────────────────
            return ResStatus.success, 'Create Success', savedDevice;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll() {
        const tag = this.findAll.name;
        try {
            const findAllResult = await this.deviceModel.find();
            return findAllResult;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
