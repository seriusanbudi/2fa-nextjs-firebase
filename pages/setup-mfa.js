import axios from "axios";
import QRcode from "qrcode.react";
import Dashboard from "components/Dashboard";
import { useEffect, useState } from "react";
import Button from "components/ui/Button";
import Input from "components/ui/Input";
import { db } from "utils/firebase";
import { useCurrentUser } from "hooks";
import { useRouter } from "next/router";

const SetupMfaPage = () => {
  const [error, setError] = useState("");
  const [mfa, setMfa] = useState(null);
  const [code, setCode] = useState("");
  const router = useRouter();

  const currentUser = useCurrentUser();

  const generateToken = () => {
    setMfa(null);
    axios
      .post("/api/generate-otp", { email: currentUser.email })
      .then((res) => {
        setMfa({ ...res.data });
      });
  };

  const verifyToken = () => {
    axios
      .post("/api/verify-otp", { token: code, secret: mfa.secret })
      .then((res) => {
        db()
          .collection("user-details")
          .doc(currentUser.uid)
          .set(
            { mfa_secret: mfa.secret, is_mfa_activated: true },
            { merge: true }
          )
          .then(() => router.push("/"));
      })
      .catch(() => {
        setError("Token not valid!");
        setCode("");
      });
  };

  useEffect(() => {
    generateToken();
  }, []);

  if (!currentUser) return false;

  return (
    <Dashboard>
      {!mfa && <div className="text-center">Generating secret...</div>}
      {mfa && (
        <>
          <div className="text-center mb-4">
            <div className="inline-block">
              <QRcode value={mfa.uri} />
            </div>
          </div>
          <div className="text-center mb-4">{mfa.secret}</div>
          <div className="mb-4">
            <div className="flex justify-center mb-1">
              <Input
                value={code}
                className="text-center"
                onChange={(e) => {
                  setCode(e.target.value);
                  setError("");
                }}
              />
            </div>
            <div className="text-red-500 text-sm text-center">{error}</div>
          </div>
          <Button
            disabled={!code}
            variant="primary"
            block
            onClick={() => verifyToken()}
          >
            Verify
          </Button>
        </>
      )}
    </Dashboard>
  );
};

export default SetupMfaPage;
