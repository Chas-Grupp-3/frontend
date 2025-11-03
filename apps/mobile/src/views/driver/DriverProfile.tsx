import ProfileInfo from "../../components/Profile/ProfileInfo";
import ProfileHeader from "../../components/Profile/ProfileHeader";

const Profile = () => {
  return (
    <div
      className="page"
      role="main"
      aria-labelledby="page-title"
      aria-describedby="page-description"
    >
      <ProfileHeader />
      <ProfileInfo />
    </div>
  );
};

export default Profile;
