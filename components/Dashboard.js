import TopNav from "components/ui/TopNav";
import BottomNav from "components/ui/BottomNav";
import { useCurrentUser } from "hooks";

const Dashboard = (props) => {
  const currentUser = useCurrentUser();

  return (
    <>
      <TopNav />
      <div style={{ padding: "12px 12px" }}>{props.children}</div>
      <BottomNav />
    </>
  );
};

export default Dashboard;
