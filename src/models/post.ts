import mongoose, { Schema, Document } from "mongoose";
import { USER_TABLE } from "./user";

export const POST_TABLE = "post";
export interface IComment {
  message: string;
}
export interface ICommentDoc extends Document<IComment>, IComment {}
export interface IPost {
  user?: string | undefined;
  title: string;
  slug: string;
  description: string;
  image: string;
  active: boolean;
  comments: IComment[];
  isFeature: boolean;
  isRecent: boolean;
}
export interface IPostDoc extends Document<IPost>, IPost {}

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: USER_TABLE, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    active: { type: Boolean, default: true },
    comments: [
      {
        message: { type: String },
      },
    ],
    isFeature: { type: Boolean, default: false },
    isRecent: { type: Boolean, default: false },
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

export const Post =
  mongoose.models[POST_TABLE] || mongoose.model<IPostDoc>(POST_TABLE, schema);
