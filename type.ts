declare module NodeJS {
  export interface ProcessEnv {
    MONGODB_URL: string;
    NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_API_URL: string;
    GITHUB_ID: string;
    GITHUB_CLIENT_SECRET: string;
  }
}
