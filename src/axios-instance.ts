import axios from "axios";
import { getSession } from "next-auth/react";
import type { AxiosResponse } from "axios";
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(async (config) => {
  const token = await getAccessToken();

  if (token) {
    config.headers["Authorization"] = token;
  } else {
    config.headers["Authorization"] = "";
  }

  return config;
});

async function getAccessToken() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return session.user.accessToken;
}

export { instance as Api };
