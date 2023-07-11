export type SIZES = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "block";
export type COLORS =
  | "primary"
  | "secondary"
  | "info"
  | "danger"
  | "warning"
  | "light"
  | "gray";
export type DIRECTION =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

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
