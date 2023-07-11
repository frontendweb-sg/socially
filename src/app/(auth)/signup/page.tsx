import SignupForm from "@/components/auth/SignupForm";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <h1>Sign up page</h1>
      <SignupForm />
      <Link href="/signin">Sign in</Link>
    </div>
  );
};

export default Page;
