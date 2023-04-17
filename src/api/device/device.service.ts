import { Injectable, InternalServerErrorException, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import moment from 'moment';
import { Model } from 'mongoose';
import { SiteDB } from 'src/entities/site.entity';
import { TypeDB } from 'src/entities/type.entity';
import { DeviceDB } from './../../entities/device.entity';
import { LogService } from './../../services/log.service';
import { ResStatus } from './../../share/enum/res-status.enum';
import { CreateResDeviceDto } from './dto/create-device.dto';

// moment.tz.setDefault('Asia/Bangkok');

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
        @InjectModel(SiteDB.name)
        private readonly siteModel: Model<SiteDB>,
        @InjectModel(TypeDB.name)
        private readonly typeModel: Model<TypeDB>,
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

            // const device = new this.deviceModel({
            //     serial_number: createDeviceDto.serial_number || null,
            //     device_name: createDeviceDto.device_name || null,
            //     id_elk: id_elk,
            //     pm2: createDeviceDto.pm2 || null,
            //     pm10: createDeviceDto.pm10 || null,
            //     heat_index: createDeviceDto.heat_index || null,
            //     humidity: createDeviceDto.humidity || null,
            //     temperature: createDeviceDto.temperature || null,
            //     altitude: createDeviceDto.altitude || null,
            //     speed: createDeviceDto.speed || null,
            //     light_detection: createDeviceDto.light_detection || null,
            //     noise: createDeviceDto.noise || null,
            //     carbon_dioxide: createDeviceDto.carbon_dioxide || null,
            //     battery: createDeviceDto.battery || null,
            //     date_data: moment().tz('asia/Bangkok').add(543, 'year').format('DD-MM-YYYY HH:mm:ss'),
            //     site: site || null,
            //     type: type || null,
            // });
            const _device = new this.deviceModel();
            _device.serial_number = createDeviceDto.serial_number ? createDeviceDto.serial_number : null;
            _device.device_name = createDeviceDto.device_name ? createDeviceDto.device_name : null;
            _device.pm2 = createDeviceDto.pm2 ? createDeviceDto.pm2 : null;
            _device.pm10 = createDeviceDto.pm10 ? createDeviceDto.pm10 : null;
            _device.heat_index = createDeviceDto.heat_index ? createDeviceDto.heat_index : null;
            _device.humidity = createDeviceDto.humidity ? createDeviceDto.humidity : null;
            _device.temperature = createDeviceDto.temperature ? createDeviceDto.temperature : null;
            _device.altitude = createDeviceDto.altitude ? createDeviceDto.altitude : null;
            _device.speed = createDeviceDto.speed ? createDeviceDto.speed : null;
            _device.light_detection = createDeviceDto.light_detection ? createDeviceDto.light_detection : null;
            _device.noise = createDeviceDto.noise ? createDeviceDto.noise : null;
            _device.carbon_dioxide = createDeviceDto.carbon_dioxide ? createDeviceDto.carbon_dioxide : null;
            _device.battery = createDeviceDto.battery ? createDeviceDto.battery : null;
            _device.date_data = moment().tz('asia/Bangkok').add(543, 'year').format('DD-MM-YYYY HH:mm:ss');
            _device.coor = {
                lat: createDeviceDto.coor_lat ? createDeviceDto.coor_lat : 0,
                lon: createDeviceDto.coor_lon ? createDeviceDto.coor_lon : 0,
            };
            _device.site = [];
            if (_device.site && _device.site.length > 0) {
                for (const siteData of createDeviceDto.site) {
                    const _site = new this.siteModel();
                    _site._id = siteData.site_id || null;
                    _site.site_name = siteData.site_name || null;
                    _site.coor = {
                        lat: createDeviceDto.coor_lat ? createDeviceDto.coor_lat : 0,
                        lon: createDeviceDto.coor_lon ? createDeviceDto.coor_lon : 0,
                    };
                    _device.site.push(_site);
                }
            }
            _device.type = [];
            if (_device.type && _device.type.length > 0) {
                for (const typeData of createDeviceDto.type) {
                    const _type = new this.typeModel();
                    _type._id = typeData.type_id || null;
                    _type.type_name = typeData.type_name || null;
                   ;
                    _device.type.push(_type);
                }
            }

            const savedDevice = await _device.save();
            // ─────────────────────────────────────────────────────────────────────────────
            const device_elk = _device;
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
                site: device_elk.site || null,
                type: device_elk.type || null,
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
