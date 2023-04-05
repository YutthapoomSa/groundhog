import { Injectable, InternalServerErrorException, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SiteDB } from 'src/entities/site.entity';
import { LogService } from 'src/services/log.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { async } from 'rxjs';

@Injectable()
export class SiteService implements OnApplicationBootstrap {
    private logger = new LogService(SiteService.name);

    constructor(
        @InjectModel(SiteDB.name)
        private readonly siteModel: Model<SiteDB>,
    ) {}
    onApplicationBootstrap() {
        //
    }
    // ─────────────────────────────────────────────────────────────

    async create(createSiteDto: CreateSiteDto) {
        const tag = this.create.name;
        try {
            if (!createSiteDto) throw new Error('Site is required');

            const site = new this.siteModel();
            site.site_name = createSiteDto.site_name;
            site.coor = {
                lat: createSiteDto.coor_lat ? createSiteDto.coor_lat : 0,
                lon: createSiteDto.coor_lon ? createSiteDto.coor_lon : 0,
            };

            const result = await site.save();
            return result;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll() {
        const tag = this.findAll.name;
        try {
            const result = await this.siteModel.find();
            return result;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    // findOne(id: number) {
    //   return `This action returns a #${id} site`;
    // }

    // update(id: number, updateSiteDto: UpdateSiteDto) {
    //   return `This action updates a #${id} site`;
    // }

    // remove(id: number) {
    //   return `This action removes a #${id} site`;
    // }
}
