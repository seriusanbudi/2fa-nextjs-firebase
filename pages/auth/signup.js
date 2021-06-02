import SignupForm from "components/forms/SignupForm";
import { useRouter } from "next/router";

const SigninPage = () => {
  const router = useRouter();

  return (
    <div className="h-screen w-full flex justify-center items-center bg-white">
      <div className="p-4 w-full" style={{ maxWidth: 320 }}>
        <h3 className="text-3xl font-bold">Create account</h3>

        <SignupForm onSuccess={() => router.push("/auth/signin")} />
      </div>
    </div>
  );
};

export default SigninPage;
