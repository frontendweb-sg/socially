import mongoose, { Schema, Document } from "mongoose";
export const DESIGNATION_TABLE = "designation";
export interface IDesignation {
  title: string;
  slug: string;
  active?: boolean;
}
export interface IDesignationDoc extends Document<IDesignation>, IDesignation {}
const schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    active: { type: Boolean, default: true },
    insertAt: { type: Date, default: Date.now },
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
export const Designation =
  mongoose.models[DESIGNATION_TABLE] ||
  mongoose.model<IDesignationDoc>(DESIGNATION_TABLE, schema);
