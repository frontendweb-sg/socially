import SigninForm from "@/components/auth/SigninForm";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <h1>Sign in page</h1>

      <SigninForm />

      <Link href="/signup">Sign up</Link>
    </div>
  );
};

export default Page;
