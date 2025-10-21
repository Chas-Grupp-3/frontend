import { Button } from "@chas/ui";
import { useAuthContext } from "../../context/auth/useAuthContext";

const Profile = () => {
  const { logout } = useAuthContext();
  return (
    <div className="page">
      <h1>Profile</h1>
      <h2>user</h2>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Profile;
