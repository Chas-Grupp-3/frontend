import { Button } from "@chas/ui";
import { useAuthContext } from "../../context/auth/useAuthContext";
import DashboardHeader from "../../components/DashboardHeader";

const Profile = () => {
  const { logout } = useAuthContext();
  return (
    <div className="page">
      <DashboardHeader title="Profile" />
      <h1>Profile</h1>
      <h2>driver</h2>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Profile;
