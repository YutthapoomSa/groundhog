import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
    collection: 'type',
    _id: true,
})
export class TypeDB extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
        allownull: true,
        unique: true,
        required: false,
    })
    indoor: string;

    @Prop({
        type: MongooseSchema.Types.String,
        allownull: true,
        unique: true,
        required: false,
    })
    outdoor: string;

    @Prop({
        type: MongooseSchema.Types.String,
        unique: true,
        allownull: true,
        required: false,
    })
    air: string;
}
export const TypeSchema = SchemaFactory.createForClass(TypeDB);
