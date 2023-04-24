import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
    collection: 'site',
    _id: true,
})
export class SiteDB extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
        unique: true,
    })
    site_name: string;

    @Prop({
        type: {
            lat: { type: MongooseSchema.Types.Number, allownull: true },
            lon: { type: MongooseSchema.Types.Number, allownull: true },
        },
        _id: false,
        unique: true,
    })
    coor: {
        lat: number;
        lon: number;
    };

    @Prop({
        type: MongooseSchema.Types.Number,
        allownull: true,
        required: false,
        unique: true,
        enum: [1, 2],
    })
    status: number;
}
export const SiteSchema = SchemaFactory.createForClass(SiteDB);
