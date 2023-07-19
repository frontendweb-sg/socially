import { ReactElement, ReactNode } from "react";
export type AppCommon = {};
export type AppProps = {
  children?: ReactNode | ReactElement;
  className?: string;
};
export type Display = "flex" | "block" | "inline" | "inline-flex";
export type Height = "25" | "50" | "75" | "100" | "auto";
export type Width = "25" | "50" | "75" | "100" | "auto";
export type Align = "left" | "right" | "center" | "justify" | "auto";
export type Theme = "light" | "dark";
export type Size = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "block";
export type Status = "new" | "edit" | "update" | "delete" | "default";
export type alignItems =
  | "start"
  | "end"
  | "flex-start"
  | "flex-end"
  | "baseline"
  | "stretch"
  | "initial"
  | "inherit";
export type justifyContent =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "initial"
  | "inherit";

export type Color =
  | "primary"
  | "secondary"
  | "info"
  | "danger"
  | "warning"
  | "light"
  | "gray";

export type Direction =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type Variant =
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

export interface IAuth {
  email: string;
  password: string;
}

export interface IAuthRegister {
  name: string;
  email: string;
  password: string;
  mobile: string;
}
