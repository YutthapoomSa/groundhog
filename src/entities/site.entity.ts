import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
    collection: 'site',
    _id: true,
})
export class SiteDB extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
        allownull: true,
        required: true,
    })
    site_name: string;

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
}
export const SiteSchema = SchemaFactory.createForClass(SiteDB);
