export enum AuthActionType {
  SUCCESS = "[AUTH SUCCESS] success",
  ERROR = "[AUTH ERROR] error",
  LOADING = "[AUTH LOADING] loading",
}

export type IAuth = {
  loading: boolean;
};

export const login = () => {};
