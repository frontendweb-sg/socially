import mongoose, { Schema, Document } from "mongoose";
import { USER_TABLE } from "./user";
export const PROFILE_TABLE = "profile";
export interface IAward {
  title: string;
  rating: number;
  image?: string | null;
}
export interface IEmployment {
  company: string; // webshree
  designation: string; // designer
  summery?: string; // i love to work
  location: string; // delhi
  salary: string; // 20k
  from: Date | null; // 2013
  to?: Date | null; // 2015
  current?: boolean; // false
  awards?: IAward[]; // ['best employe of the year']
  skills: string[]; // ['html','css','photosho']
}

export interface IEducation {
  college: string; // kic
  stream: string; // BCA
  from: Date | null;
  location?: string;
  to?: Date | null;
  summary?: string;
  board?: string;
  medium?: string;
  grade?: string;
  marks?: number | null;
  current?: boolean;
  subjects?: string[];
}

export interface ISkill {
  language: string;
  proficiency: Proficiency;
  rating: number;
}

export enum Gender {
  male = "Male",
  female = "Female",
  unknown = "Unknown",
}
export enum Proficiency {
  beginer = "Beginer",
  intermediate = "Intermediate",
  expert = "expert",
}

export interface ILanguage {
  code: string;
  name: string;
  options: {
    read: boolean;
    write: boolean;
    speak: boolean;
  }[];
}
export interface ISocial {
  youtube: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  instagram: string;
}

export interface IProfile {
  user: string;
  dob: string;
  company: string;
  designation: string;
  summary: string;
  gender: Gender;
  exp: string;
  location: string;
  gitusername: string;
  qualification: string;
  website: string;
  resume?: string;
  active: boolean;
  social: ISocial;
  noticeperiod?: string;
  languages: ILanguage[];
  hobbies: string[];
  employment?: IEmployment[];
  education?: IEducation[];
  skills: ISkill[];
}

export interface IProfileDoc extends Document<IProfile>, IProfile {}

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: USER_TABLE, required: true },
  dob: { type: Date, default: new Date() },
  avatar: { type: String },
  company: { type: String, required: true },
  designation: { type: String, required: true },
  summary: { type: String, required: true, minlength: 0, maxlength: 500 },
  gender: {
    type: String,
    required: true,
    default: Gender.unknown,
    enum: Gender,
  },
  totalExp: { type: String, required: true },
  location: { type: String },
  gitusername: { type: String },
  qualification: { type: String, required: true },
  website: { type: String, required: true },
  languages: [
    {
      code: { type: String },
      name: { type: String },
      options: [
        {
          read: { type: Boolean, default: false },
          write: { type: Boolean, default: false },
          speak: { type: Boolean, default: false },
        },
      ],
    },
  ],
  hobbies: { type: [String] },
  active: { type: Boolean, default: true },
  noticeperiod: { type: String },
  social: {
    youtube: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    instagram: { type: String },
  },
  skills: [
    {
      title: { type: String },
      proficiency: {
        type: String,
        default: Proficiency.beginer,
        enum: Proficiency,
      },
      rating: {
        type: Number,
        default: 0,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
    },
  ],
  education: [
    {
      college: { type: String },
      stream: { type: String },
      from: { type: Date, default: null },
      location: { type: String, default: null },
      summary: { type: String, default: "", minlength: 0, maxlength: 500 },
      subjects: { type: [String], default: [] },
      medium: { type: String, default: "" },
      board: { type: String, default: "" },
      grade: { type: String, default: "" },
      marks: { type: String, default: null },
      to: { type: Date, default: null },
      current: { type: Boolean, default: false },
    },
  ],
  experience: [
    {
      company: { type: String, required: true },
      designation: { type: String, required: true },
      summery: { type: String, minLength: 0, maxLength: 120 },
      location: { type: String },
      salary: { type: String, default: 0 },
      from: { type: Date, default: null },
      to: { type: Date, default: null },
      current: { type: Boolean, default: false },
      awards: [
        {
          title: { type: String, default: "" },
          rating: { type: Number, default: 0 },
          image: { type: String, default: null },
        },
      ],
      skills: [
        {
          language: { type: String },
          rating: { type: Number, default: 0 },
          proficiency: {
            type: String,
            default: Proficiency.beginer,
            enum: Proficiency,
          },
        },
      ],
    },
  ],
});

export const Profile =
  mongoose.models[PROFILE_TABLE] ||
  mongoose.model<IProfileDoc>(PROFILE_TABLE, schema);
