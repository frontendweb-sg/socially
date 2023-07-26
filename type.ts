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
  defaultValues?: string | T | T[];
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
