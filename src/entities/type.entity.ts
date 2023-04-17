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
        required: false,
    })
    type_name: string;

    @Prop({
        type: MongooseSchema.Types.String,
        allownull: true,
        required: false,
    })
    iframe_url: string;

    // @Prop({
    //     type: MongooseSchema.Types.Number,
    //     required: true,
    //     enum: [1, 2],
    // })
    // status: number;
}
export const TypeSchema = SchemaFactory.createForClass(TypeDB);
