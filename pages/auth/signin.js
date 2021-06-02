import SigninForm from "components/forms/SigninForm";
import Button from "components/ui/Button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Input from "components/ui/Input";
import { auth, db } from "utils/firebase";
import axios from "axios";

const SigninPage = () => {
  const router = useRouter();

  const [userCredentials, setUserCredentials] = useState(null);
  const [mfaSecret, setMfaSecret] = useState(null);
  const [userToken, setUserToken] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [mfaError, setMfaError] = useState("");

  const handleSuccessSignin = async (signinInfo, userData) => {
    const userId = userData.user.uid;
    const userDetails = await db()
      .collection("user-details")
      .doc(userId)
      .get()
      .then((res) => res.data());

    if (userDetails.is_mfa_activated) {
      setUserCredentials({ ...signinInfo });
      setMfaSecret(userDetails.mfa_secret);
    } else {
      router.push("/");
    }
  };

  const verifyToken = () => {
    setVerifying(true);

    // verify the token
    axios
      .post("/api/verify-otp", { secret: mfaSecret, token: userToken })
      .then((res) => {
        // sign user using user credentials
        auth()
          .signInWithEmailAndPassword(
            userCredentials.email,
            userCredentials.password
          )
          .then((userData) => {
            // redirect user
            router.push("/");
            setVerifying(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        setUserToken("");
        setVerifying(false);
        setMfaError("Failed to verify!");
      });
  };

  useEffect(() => {
    if (mfaError) setMfaError("");
    if (userToken.length === 6) verifyToken();
  }, [userToken]);

  return (
    <div className="h-screen w-full flex justify-center items-center bg-white">
      <div className="p-4 w-full" style={{ maxWidth: 320 }}>
        {!mfaSecret && (
          <>
            <h3 className="text-3xl font-bold">Sign in</h3>
            <div className="mb-20">
              <SigninForm onSuccess={handleSuccessSignin} />
            </div>
            <Button
              onClick={() => router.push("/auth/signup")}
              block
              variant="link"
            >
              Create account
            </Button>
          </>
        )}

        {mfaSecret && (
          <>
            <h3 className="text-3xl font-bold mb-2">2FA Token</h3>
            <Input
              error={mfaError}
              disabled={verifying}
              className="text-center mb-1"
              value={userToken}
              onChange={(e) => setUserToken(e.target.value)}
            />
            <div className="text-red-500 text-sm text-center">{mfaError}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default SigninPage;
