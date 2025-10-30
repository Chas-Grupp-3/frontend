import styled from "styled-components";
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
      <ScreenReaderOnly id="page-title">Driver Profile</ScreenReaderOnly>

      <ScreenReaderOnly id="page-description">
        Show and handle your profile as a driver. Here you can see your
        information and log out.
      </ScreenReaderOnly>

      <ProfileHeader />
      <ProfileInfo />
    </div>
  );
};

export default Profile;

const ScreenReaderOnly = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
