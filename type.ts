declare module NodeJS {
  export interface ProcessEnv {
    MONGODB_URL: string;
    NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_API_URL: string;
    GITHUB_ID: string;
    GITHUB_CLIENT_SECRET: string;
  }
}

interface SelectProps<T> {
  options: T[];
  defaultValues?: T[];
  keyExtractor?: (option: T) => string;
  getOptionLabel?: (option: T) => string;
  setValues?: (name: string, option: T | T[]) => void;
}
