import Dashboard from "components/Dashboard";
import Button from "components/ui/Button";
import { useCurrentUser } from "hooks";
import { useRouter } from "next/router";
import { db } from "utils/firebase";

const HomePage = () => {
  const router = useRouter();
  const currentUser = useCurrentUser();

  const handleDisableMfa = () => {
    db()
      .collection("user-details")
      .doc(currentUser.uid)
      .set({ is_mfa_activated: false, mfa_secret: null }, { merge: true })
      .then(() => location.reload());
  };

  if (!currentUser.isAuthenticated) return false;

  return (
    <Dashboard>
      <div className="flex justify-between items-center">
        <div>2 Factor Authentication</div>
        <>
          {!currentUser.isMfaActivated && (
            <Button variant="primary" onClick={() => router.push("/setup-mfa")}>
              Activate
            </Button>
          )}

          {currentUser.isMfaActivated && (
            <Button
              variant="primary"
              color="danger"
              onClick={() => handleDisableMfa()}
            >
              Disable
            </Button>
          )}
        </>
      </div>
    </Dashboard>
  );
};

export default HomePage;
