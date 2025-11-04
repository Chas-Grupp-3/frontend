import { useEffect, useState } from "react";
import { userService } from "../../services/userService";
import { useAuthContext } from "../../context/auth/useAuthContext";
import { isApiError } from "../../types/apiTypes";
import type { BackendUser } from "../../types/userTypes";
import { colors, radius, textMobile, Icon } from "@chas/ui";
import styled from "styled-components";

const ProfileInfo = () => {
  const { userId } = useAuthContext();
  const [user, setUser] = useState<BackendUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setError("No user ID found");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await userService.fetchUserById(userId);

        if (isApiError(result)) {
          setError(result.message);
          setUser(null);
        } else {
          setUser(result);
          setError(null);
        }
      } catch (catchError) {
        console.error("API Error:", catchError);
        setError("Couldn't fetch user data");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <LoadingContainer
        role="status"
        aria-live="polite"
        aria-label="Loading profile information"
      >
        <p>Loading profile information...</p>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer
        role="alert"
        aria-live="assertive"
        aria-label="Error loading profile information"
      >
        <p>Error: {error}</p>
      </ErrorContainer>
    );
  }

  if (!user) {
    return (
      <ErrorContainer role="alert" aria-label="No user data available">
        <p>No user information available</p>
      </ErrorContainer>
    );
  }

  return (
    <StyledBox
      role="main"
      aria-labelledby="profile-heading"
      aria-describedby="profile-description"
    >
      <Icon
        name="delivery"
        size="xl"
        alt={`Profile icon for ${user.role} - ${user.name}`}
        aria-hidden="false"
      />

      <StyledTitle as="h2" id="profile-heading">
        Profile
      </StyledTitle>

      <ProfileDetails
        id="profile-description"
        role="region"
        aria-label="User information"
      >
        <StyledText>
          <strong>Name:</strong>
          <span aria-label={`Username: ${user.name}`}>{user.name}</span>
        </StyledText>

        <StyledText>
          <strong>Email:</strong>
          <span aria-label={`Email: ${user.email}`}>{user.email}</span>
        </StyledText>

        <StyledText>
          <strong>Role:</strong>
          <span aria-label={`User role: ${user.role}`}>{user.role}</span>
        </StyledText>
      </ProfileDetails>
    </StyledBox>
  );
};

export default ProfileInfo;

const StyledBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 3rem;
  background-color: ${colors.blueBackground};
  gap: 0.7rem;
  border-radius: ${radius.box};
  margin-top: 2rem;
`;

const StyledTitle = styled.div`
  color: ${colors.cardText};
  ${textMobile.h2}
  margin-bottom: 1.5rem;
`;

const StyledText = styled.div`
  color: ${colors.cardText};
  ${textMobile.body.md}
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 100%;
`;

const LoadingContainer = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${colors.cardText};
`;

const ErrorContainer = styled.div`
  padding: 2rem;
  text-align: center;
  color: #d32f2f;
`;
