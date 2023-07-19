import mongoose, { Schema, Document } from "mongoose";
import { USER_TABLE } from "./user";

export const POST_TABLE = "post";
export enum EStatus {
  "pending" = "Pending",
  "rejected" = "Rejected",
  "approved" = "Approved",
}
export enum Privacy {
  public = "public",
  friends = "friends",
  private = "private",
}
export interface ILike {
  user: string;
  active: boolean;
}
export interface IComment {
  message: string;
  avatar: string;
  status: EStatus;
  active?: boolean;
  code?: string;
  media?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IPost {
  user?: string | undefined;
  content: string;
  code: string;
  privacy: Privacy;
  active: boolean;
  shares: number;
  tags: string[];
  media: string[];
  attachments: string[];
  comments: ICommentDoc[];
  likes: ILike[];
  isFeature: boolean;
  isRecent: boolean;
}
export interface ICommentDoc extends Document<IComment>, IComment {}
export interface IPostDoc extends Document<IPost>, IPost {}
const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: USER_TABLE, required: true },
    content: { type: String, default: "" },
    code: { type: String, default: "" },
    privacy: { type: String, default: Privacy.private, enum: Privacy },
    active: { type: Boolean, default: true },
    shares: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    media: { type: [String], default: [] },
    attachments: { type: [String], default: [] },
    comments: [
      {
        message: { type: String },
        avatar: { type: String },
        status: { type: String, default: EStatus.pending, enum: EStatus },
        active: { type: Boolean, default: true },
        code: { type: String, default: "" },
        media: { type: [String], default: [] },
        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date, default: Date.now() },
      },
    ],
    likes: [
      {
        user: { type: Schema.Types.ObjectId, ref: USER_TABLE },
        active: { type: Boolean, default: false },
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
