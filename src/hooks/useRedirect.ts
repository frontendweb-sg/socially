import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRedirect() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) router.replace("/");
  }, [router, session]);
}
