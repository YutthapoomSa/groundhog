import { Injectable, InternalServerErrorException, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TypeDB } from 'src/entities/type.entity';
import { LogService } from 'src/services/log.service';
import { CreateTypeDto } from './dto/create-type.dto';

@Injectable()
export class TypeService implements OnApplicationBootstrap {
    private logger = new LogService(TypeService.name);

    constructor(
        @InjectModel(TypeDB.name)
        private readonly typeModel: Model<TypeDB>,
    ) {}
    onApplicationBootstrap() {
        //
    }
    // ─────────────────────────────────────────────────────────────

    async create(createTypeDto: CreateTypeDto) {
        const tag = this.create.name;
        try {
            const type = new this.typeModel();
            type.type_name = createTypeDto.type_name ? createTypeDto.type_name : null;
            type.iframe_url = createTypeDto.iframe_url ? createTypeDto.iframe_url : null;

            const result = await type.save();
            return result;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    // findAll() {
    //   return `This action returns all type`;
    // }

    // findOne(id: number) {
    //   return `This action returns a #${id} type`;
    // }

    // update(id: number, updateTypeDto: UpdateTypeDto) {
    //   return `This action updates a #${id} type`;
    // }

    // remove(id: number) {
    //   return `This action removes a #${id} type`;
    // }
}
