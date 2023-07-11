import { Password } from "@/utils/password";
import mongoose, { Schema, Document } from "mongoose";

export const USER_TABLE = "user";
export interface IUser {
  name: string;
  email: string;
  password: string;
  picture: string;
  mobile: string;
  role: string;
  verify: string;
  resetToken: string;
  active: boolean;
}

export interface IUserDoc extends Document<IUser>, IUser {}
const schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    picture: { type: String, default: "" },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    verify: { type: Boolean, default: false },
    resetToken: { type: String, default: null },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        doc.id = ret._id;
        delete ret.password;
        delete ret.__v;
        delete doc.__v;
      },
    },
  }
);
// hash password and verify true if role is admin

schema.pre("save", function cb(done) {
  if (this.isModified("password")) {
    let pwd = Password.hash(this.get("password"));
    this.set("password", pwd);
  }
  if (this.get("role") === "admin") this.set("verify", true);
  done();
});

export const User =
  mongoose.models[USER_TABLE] || mongoose.model<IUserDoc>(USER_TABLE, schema);
