import mongoose, { Schema, Document } from "mongoose";
import { USER_TABLE } from "./user";

export const TAGS_TABLE = "tag";

export interface ITag {
  user?: string | undefined;
  title: string;
  slug: string;
  active: boolean;
}
export interface ITagDoc extends Document<ITag>, ITag {}

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: USER_TABLE, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        doc.id = ret._id;
        ret.id = ret._id;
      },
    },
  }
);

export const Tag =
  mongoose.models[TAGS_TABLE] || mongoose.model<ITagDoc>(TAGS_TABLE, schema);
