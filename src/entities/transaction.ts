import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum EnumType {
    indoor = 'indoor',
    outdoor = 'outdoor',
    airStation = 'airStation',
}

@Schema({
    collection: 'transaction',
    _id: true,
})
export class TransactionDB extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
        allownull: false,
        required: true,
    })
    serial_number: string;

    @Prop({
        type: MongooseSchema.Types.String,
        allownull: true,
        required: false,
    })
    serialNumber: string;

    @Prop({
        type: MongooseSchema.Types.String,
        allownull: true,
        required: false,
    })
    flag: string;

    @Prop({
        type: MongooseSchema.Types.String,
        required: false,
    })
    id_elk: string;

    @Prop({
        type: MongooseSchema.Types.Number,
        allownull: false,
        required: true,
    })
    humidity: number;

    @Prop({
        type: MongooseSchema.Types.Number,
        allownull: false,
        required: true,
    })
    temperature: number;

    @Prop({
        type: MongooseSchema.Types.Number,
        allownull: false,
        required: true,
    })
    heat_index: number;
}

export const TransactionSchema = SchemaFactory.createForClass(TransactionDB);
