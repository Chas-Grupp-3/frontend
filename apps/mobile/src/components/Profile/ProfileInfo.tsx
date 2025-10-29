import { useEffect, useState } from "react";
import { userService } from "../../services/userService";
import { useAuthContext } from "../../context/auth/useAuthContext";
import { isApiError } from "../../types/apiTypes";
import type { BackendUsers } from "../../types/packageTypes";
import { colors, radius } from "@chas/ui";
import styled from "styled-components";

const ProfileInfo = () => {
  const { userId } = useAuthContext();
  const [user, setUser] = useState<BackendUsers | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setError("Inget användar-ID tillgängligt");
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
        setError("Kunde inte hämta användarinformation");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <p>Hämtar profilinformation...</p>;
  }

  if (error) {
    return <p>Fel: {error}</p>;
  }

  if (!user) {
    return <p>Ingen användarinformation tillgänglig</p>;
  }

  return (
    <StyledBox>
      <h3>Profilinformation</h3>
      <p>
        <strong>Namn:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Roll:</strong> {user.role}
      </p>
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
  padding: 4rem;
  background-color: ${colors.blueBackground};
  gap: 2rem;
  border-radius: ${radius.box};
  margin-top: 2rem;
`;
