import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Link } from "./link.schema";
export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({unique: false, isRequired: true})
  surname: string;
  @Prop({unique: false, isRequired: true})
  name: string;
  @Prop({unique: false, isRequired: true})
  password: string;
  @Prop({unique: true, isRequired: true})
  email: string;
  @Prop({unique: false, isRequired: false})
  avatar: string;
  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, strictPopulate:false, ref:'Link'}]})
  links: Link[];
  _id: import("mongoose").Schema.Types.ObjectId;
}
export const UserSchema = SchemaFactory.createForClass(User);