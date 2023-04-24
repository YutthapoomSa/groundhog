import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
    collection: 'type',
    _id: true,
})
export class TypeDB extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
        unique: false, // ตั้งค่าเป็น false เพื่อให้ข้อมูลซ้ำกันได้
    })
    type_name: string;

    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
        unique: false, // ตั้งค่าเป็น false เพื่อให้ข้อมูลซ้ำกันได้
    })
    iframe_url: string;
}
export const TypeSchema = SchemaFactory.createForClass(TypeDB);
