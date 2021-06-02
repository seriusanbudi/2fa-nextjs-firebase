import Dashboard from "components/Dashboard";
import Button from "components/ui/Button";
import { useRouter } from "next/router";
import { auth } from "utils/firebase";

const MePage = () => {
  const router = useRouter();

  const handleLogout = () => {
    auth().signOut();
    router.push("/auth/signin");
  };

  return (
    <Dashboard>
      <div className="flex justify-center mt-10">
        <div
          className="rounded-lg bg-blue-300 mb-8"
          style={{ width: "120px", height: "120px" }}
        ></div>
      </div>
      {/* <div className="text-center mb-10">{currentUser.email}</div> */}

      <div style={{ padding: 12 }}>
        <Button block variant="primary" color="danger" onClick={handleLogout}>
          Signout
        </Button>
      </div>
    </Dashboard>
  );
};

export default MePage;
