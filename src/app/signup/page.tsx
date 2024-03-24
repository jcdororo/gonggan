import { getServerSession } from "next-auth";
import SignUpForm from "../components/Sign/SignupForm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <SignUpForm session={session} />
    </div>
  );
}
