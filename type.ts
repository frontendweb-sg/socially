declare module NodeJS {
  export interface ProcessEnv {
    MONGODB_URL: string;
    NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_API_URL: string;
    GITHUB_ID: string;
    GITHUB_CLIENT_SECRET: string;
    NEXT_PUBLIC_CLOUDINARY_NAME: string;
    NEXT_PUBLIC_CLOUDINARY_API_URL: string;
    NEXT_PUBLIC_CLOUDINARY_API_KEY: string;
    NEXT_PUBLIC_CLOUDINARY_SECRET_KEY: string;
  }
}

interface SelectProps<T> {
  options: T[];
  defaultValues?: T[];
  keyExtractor?: (option: T) => string;
  getOptionLabel?: (option: T) => string;
  setValues?: (name: string, option: T | T[]) => void;
}

type Extention = {
  html: ".html";
  javascript: ".js,.jsx";
  typescript: ".ts,.tsx";
  css: ".css";
  scss: ".scss";
  json: ".json";
  php: ".php";
  java: ".java";
};

interface IFile extends File {
  preview?: string;
}

type ButtonVariant = "text" | "filled" | "outline";
type Height = "25" | "50" | "75" | "100" | "auto";
type Width = "25" | "50" | "75" | "100" | "auto";
type Align = "left" | "right" | "center" | "justify" | "auto";
type Theme = "light" | "dark";
type Size = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "block";
type Display = "flex" | "block" | "inline" | "inline-flex";
type Status =
  | "new"
  | "edit"
  | "update"
  | "delete"
  | "default"
  | "approved"
  | "rejected"
  | "pending"
  | "active"
  | "inactive";
type AlignItems =
  | "start"
  | "end"
  | "flex-start"
  | "flex-end"
  | "baseline"
  | "stretch"
  | "initial"
  | "inherit";
type JustifyContent =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "initial"
  | "inherit";
type Color =
  | "primary"
  | "secondary"
  | "info"
  | "danger"
  | "warning"
  | "light"
  | "gray";
type Direction =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "span";
