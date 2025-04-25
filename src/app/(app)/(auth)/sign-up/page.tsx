import { SignUpView } from "@/modules/auth/sign-up-view";
import { redirect } from "next/navigation";
import { caller } from "@/trpc/server";

const SignUpPage = async () => {
  const session = await caller.auth.session();
  if (session.user) {
    redirect("/");
  }
  return <SignUpView />;
};

export default SignUpPage;
