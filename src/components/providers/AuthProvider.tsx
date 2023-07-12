import { signIn, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

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
      console.log(res);

      setProviders(res);
    }
    fetchProviders();
  }, []);

  if (providers) {
    return Object.values(providers).map((provider: Provider) => (
      <button key={provider.id} onClick={async () => await login(provider.id)}>
        {provider.id}
      </button>
    ));
  }

  return null;
};

export default AuthProvider;
