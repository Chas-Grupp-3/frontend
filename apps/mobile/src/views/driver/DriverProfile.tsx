import { Button } from "@chas/ui";
import { useAuthContext } from "../../context/auth/useAuthContext";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import ProfileHeader from "../../components/Profile/ProfileHeader";

const Profile = () => {
  const { logout } = useAuthContext();

  return (
    <div className="page">
      <ProfileHeader />
      <ProfileInfo />
      
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Profile;
