"use client";
import { signIn, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "../controls/Button";

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | undefined;
}

type Providers = Record<string, Provider>;

const AuthProvider = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  const login = async (id: string) => {
    const result = await signIn(id);
    console.log(result);
  };

  useEffect(() => {
    async function fetchProviders() {
      const res = await getProviders();
      setProviders(res);
    }
    fetchProviders();
  }, []);

  if (providers) {
    return Object.values(providers)
      .filter((item) => item.id !== "credentials")
      .map((provider: Provider) => (
        <Button
          key={provider.id}
          onClick={async () => await login(provider.id)}
        >
          {provider.id}
        </Button>
      ));
  }

  return null;
};

export default AuthProvider;
