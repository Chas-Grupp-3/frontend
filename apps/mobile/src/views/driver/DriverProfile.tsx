import { Button } from "@chas/ui";
import { useAuthContext } from "../../context/auth/useAuthContext";
import ProfileInfo from "../../components/ProfileInfo";

const Profile = () => {
  const { logout } = useAuthContext();

  return (
    <div className="page">
      <ProfileInfo />
      <h1>Profile</h1>
      <h2>driver</h2>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Profile;
