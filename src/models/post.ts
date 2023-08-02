import mongoose, { Schema, Document } from "mongoose";
import { USER_TABLE } from "./user";

export const POST_TABLE = "post";
export enum EStatus {
  "pending" = "Pending",
  "rejected" = "Rejected",
  "approved" = "Approved",
}
export type Code = {
  language: string;
  language_code: string;
};
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
  code?: Code;
  media?: string[];
}

export interface Media {
  public_id: string;
  secure_url: string;
  resource_type?: string;
  access_mode?: string;
  folder?: string;
  type?: string;
  version_id?: string;
}
export interface IPost {
  user?: string | undefined;
  content: string;
  code: Code;
  privacy: Privacy;
  active: boolean;
  shares: number;
  tags: string[] | null;
  images: Media[];
  attachments: string[];
  comments: ICommentDoc[];
  likes: ILike[];
  isFeature: boolean;
  isRecent: boolean;
}
export interface ICommentDoc extends Document<IComment>, IComment {
  createdAt?: string;
  updatedAt?: string;
}
export interface IPostDoc extends Document<IPost>, IPost {
  createdAt?: string;
  updatedAt?: string;
}
export interface ILikeDoc extends Document<ILike>, ILike {}
const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: USER_TABLE, required: true },
    content: { type: String, default: "" },
    code: {
      language: { type: String, default: "" },
      language_code: { type: String, default: "" },
    },
    privacy: { type: String, default: Privacy.private, enum: Privacy },
    active: { type: Boolean, default: true },
    shares: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    images: [
      {
        public_id: { type: String, required: true },
        secure_url: { type: String, required: true },
        resource_type: { type: String, default: "" },
        access_mode: { type: String, default: "" },
        folder: { type: String, default: "" },
        type: { type: String, default: "" },
        version_id: { type: String, default: "" },
      },
    ],
    attachments: { type: [String], default: [] },
    comments: [
      {
        message: { type: String },
        avatar: { type: String },
        status: { type: String, default: EStatus.pending, enum: EStatus },
        active: { type: Boolean, default: true },
        code: {
          language: { type: String, default: "" },
          language_code: { type: String, default: "" },
        },
        media: { type: [String], default: [] },
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
