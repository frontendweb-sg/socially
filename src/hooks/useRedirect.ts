import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function useRedirect() {
  const router = useRouter();
  const params = useSearchParams();
  const url = params.get("callbackUrl");
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const role = session?.user.role;
      const url = role === "admin" ? "/admin" : role === "user" ? "/user" : "/";
      router.replace(url);
    }
  }, [router, session]);
}
