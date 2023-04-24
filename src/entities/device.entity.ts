import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { SiteDB } from './site.entity';
import { TypeDB } from './type.entity';

@Schema({
    collection: 'device',
    _id: true,
})
export class DeviceDB extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
    })
    device_name: string;

    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
    })
    serial_number: string;

    @Prop({
        type: MongooseSchema.Types.Number,
        allownull: true,
        required: false,
    })
    pm2: number;

    @Prop({
        type: MongooseSchema.Types.Number,
        allownull: true,
        required: false,
    })
    pm10: number;

    @Prop({
        type: MongooseSchema.Types.Number,
        allownull: true,
        required: false,
    })
    heat_index: number;

    @Prop({
        type: MongooseSchema.Types.Number,
        allownull: true,
        required: false,
    })
    humidity: number;

    @Prop({
        type: MongooseSchema.Types.Number,
        allownull: true,
        required: false,
    })
    temperature: number;

    @Prop({
        type: MongooseSchema.Types.Number,
        allownull: true,
        required: false,
    })
    altitude: number;

    @Prop({
        type: MongooseSchema.Types.Number,
        allownull: true,
        required: false,
    })
    speed: number;

    @Prop({
        type: MongooseSchema.Types.Number,
        allownull: true,
        required: false,
    })
    light_detection: number;

    @Prop({
        type: MongooseSchema.Types.Number,
        allownull: true,
        required: false,
    })
    noise: number;

    @Prop({
        type: MongooseSchema.Types.Number,
        allownull: true,
        required: false,
    })
    carbon_dioxide: number;

    @Prop({
        type: MongooseSchema.Types.Number,
        allownull: true,
        required: false,
    })
    battery: number;

    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
    })
    id_elk: string;

    @Prop({
        type: MongooseSchema.Types.String,
    })
    date_data: string;

    @Prop({
        type: {
            lat: { type: MongooseSchema.Types.Number, allownull: true },
            lon: { type: MongooseSchema.Types.Number, allownull: true },
        },
        _id: false,
    })
    coor: {
        lat: number;
        lon: number;
    };

    // ─────────────────────────────────────────────────────────────────────
    @Prop({
        type: [{ type: MongooseSchema.Types.ObjectId, ref: SiteDB.name }],
        required: true,
        unique: true,
    })
    siteList: SiteDB[];

    @Prop({
        type: [{ type: MongooseSchema.Types.ObjectId, ref: TypeDB.name }],
        required: true,
    })
    typeList: TypeDB[];

    // @Prop({
    //     type: MongooseSchema.Types.ObjectId,
    //     ref: SiteDB.name,
    //     required: false,
    // })
    // site_id: MongooseSchema.Types.ObjectId

    // @Prop({
    //     type: MongooseSchema.Types.ObjectId,
    //     ref: SiteDB.name,
    //     required: false,
    // })
    // type_id: MongooseSchema.Types.ObjectId
}
export const DeviceSchema = SchemaFactory.createForClass(DeviceDB);
