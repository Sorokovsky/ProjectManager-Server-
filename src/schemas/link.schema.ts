import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from "./user.schema";
export type LinkDocument = Link & Document;
@Schema()
export class Link {
  @Prop({unique: false, isRequired: true})
  name:string;
  @Prop({unique: false, isRequired: false})
  description:string;
  @Prop({unique: false, isRequired: false})
  preview:string;
  @Prop({unique: false, isRequired: true})
  href:string;
  @Prop({type: {type: mongoose.Schema.Types.ObjectId, ref:'User'}})
  user: User;
  _id: import("mongoose").Schema.Types.ObjectId;
}
export const LinkSchema = SchemaFactory.createForClass(Link);