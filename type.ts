declare module NodeJS {
  export interface ProcessEnv {
    MONGODB_URL: string;
    NEXTAUTH_SECRET: string;
  }
}
