import { Injectable, InternalServerErrorException, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
// import moment from 'moment';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { SiteDB } from 'src/entities/site.entity';
import { TypeDB } from 'src/entities/type.entity';
import { DeviceDB } from './../../entities/device.entity';
import { LogService } from './../../services/log.service';
import { CreateResDeviceDto } from './dto/create-device.dto';
import { ResStatus } from 'src/share/enum/res-status.enum';
import moment = require('moment-timezone');

moment.tz.setDefault('Asia/Bangkok');

// ───────────────────────────[สถานที่ประกาศ]───────────────────────────────────────────
const url = 'https://1a0c-101-109-253-166.ngrok-free.app/groundhog/_doc/';
const username = 'elastic';
const password = 'P@ssw0rd2@22##';
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
            if (!createDeviceDto) throw new Error('Missing device data !!');

            const id_elk = createDeviceDto.serial_number
                ? String(createDeviceDto.serial_number + moment().format('YYYYMMDDHHmmss'))
                : moment().format('YYYYMMDDHHmmss');

            const _device = new this.deviceModel();
            _device.id_elk = id_elk;
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

            _device.siteList = [];
            if (createDeviceDto.site && createDeviceDto.site.length > 0) {
                for (const siteData of createDeviceDto.site) {
                    const _site = new this.siteModel();
                    _site.site_name = siteData.site_name ? siteData.site_name : null;
                    _site.coor = {
                        lat: createDeviceDto.coor_lat ? createDeviceDto.coor_lat : 0,
                        lon: createDeviceDto.coor_lon ? createDeviceDto.coor_lon : 0,
                    };
                    await _site.save();
                    _device.siteList.push(_site);
                }
            }
            _device.typeList = [];
            if (createDeviceDto.type && createDeviceDto.type.length > 0) {
                for (const typeData of createDeviceDto.type) {
                    const _type = new this.typeModel();
                    _type.type_name = typeData.type_name ? typeData.type_name : null;
                    _type.iframe_url = typeData.iframe_url ? typeData.iframe_url : null;
                    await _type.save();
                    _device.typeList.push(_type);
                }
            }

            const savedDevice = await _device.save();
            console.log('deviceCreate => ', JSON.stringify(_device, null, 2));
            // ─────────────────────────────────────────────────────────────────────────────
            const device_elk = _device;
            const deviceELK = {
                serial_number: device_elk.serial_number ? device_elk.serial_number : null,
                device_name: device_elk.device_name ? device_elk.device_name : null,
                id_elk: id_elk,
                pm2: device_elk.pm2 ? device_elk.pm2 : null,
                pm10: device_elk.pm10 ? device_elk.pm10 : null,
                heat_index: device_elk.heat_index ? device_elk.heat_index : null,
                humidity: device_elk.humidity ? device_elk.humidity : null,
                temperature: device_elk.temperature ? device_elk.temperature : null,
                altitude: device_elk.altitude ? device_elk.altitude : null,
                speed: device_elk.speed ? device_elk.speed : null,
                light_detection: device_elk.light_detection ? device_elk.light_detection : null,
                noise: device_elk.noise ? device_elk.noise : null,
                carbon_dioxide: device_elk.carbon_dioxide ? device_elk.carbon_dioxide : null,
                battery: device_elk.battery ? device_elk.battery : null,
                // coor_lat: device_elk.coor.lat ? device_elk.coor.lat : null,
                // coor_lon: device_elk.coor.lon ? device_elk.coor.lon : null,
                coor: {
                    lat: device_elk.coor.lat ? device_elk.coor.lat : 0,
                    lon: device_elk.coor.lon ? device_elk.coor.lon : 0,
                },
                date_data: device_elk.date_data,
                // date_data: moment().format().toString(),
                site: device_elk.siteList,
                type: device_elk.typeList,
            };
            console.log('deviceELK => ', JSON.stringify(deviceELK, null, 2));
            // ─────────────────────────────────────────────────────────────────────────────
            await axios
                .put(url + id_elk, deviceELK, { auth })
                .then((results) => {
                    console.log('สถานะ Axios: ', JSON.stringify(results.data, null, 2));
                })
                .catch((error) => {
                    console.log('Failed to fetch -> ', error);
                });
            // ─────────────────────────────────────────────────────────────────────────────
            return ResStatus.success, 'Success', savedDevice;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    // ─────────────────────────────────────────────────────────────────────────────

    async findAll() {
        const tag = this.findAll.name;
        try {
            const findAllResult = await this.deviceModel.find();
            return findAllResult;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async shootApi() {
        const urlThunder = 'https://dc7a-119-76-182-47.ngrok-free.app/device';
        const randomTemp = Math.floor(Math.random() * (40 - 10 + 1) + 10);
        const randomHumidity = Math.floor(Math.random() * (100 - 0 + 1) + 0);
        const data = {
            serial_number: 'FWHOutdoor01',
            device_name: 'FWH-Outdoor-01',
            pm2: 25,
            pm10: 0,
            heat_index: 30,
            humidity: randomHumidity,
            temperature: randomTemp,
            altitude: 0,
            speed: 0,
            light_detection: 0,
            noise: 0,
            carbon_dioxide: 0,
            battery: 100,
            date_data: '',
            coor_lat: 13.88057708740234,
            coor_lon: 100.5911178588867,
            site: [
                {
                    site_name: 'ศูนย์ลมร้อน โรงพยาบาลค่ายวชิราวุธ',
                    coor_lat: 13.88057708740234,
                    coor_lon: 100.5911178588867,
                },
            ],
            type: [
                {
                    type_name: 'outdoor',
                    iframe_url:
                        'http://202.44.231.125:3001/d/XmmX2TLVk/outdoortemplate?orgId=1&refresh=5s&var-device=site_name.keyword%7C%3D%7CFWH-Outdoor-01&var-device=type.keyword%7C%3D%7Coutdoor&kiosk&theme=light',
                },
            ],
        };
        const config = { timeout: 5000 };
        // return this.axiosService.post(url, data, config);
        await axios
                .post(urlThunder, data, config)
                .then((results) => {
                    console.log('สถานะการยิง API: ', JSON.stringify(results.data, null, 2));
                })
                .catch((error) => {
                    console.log('Failed to fetch -> ', error);
                });
    }
}
