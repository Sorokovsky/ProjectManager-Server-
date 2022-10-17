import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({unique: false, isRequired: true})
  surname: string;
  @Prop({unique: false, isRequired: true})
  name: number;
  @Prop({unique: true, isRequired: true})
  email: string;
  @Prop({unique: false, isRequired: false})
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);