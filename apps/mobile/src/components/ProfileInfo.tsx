import { useEffect } from "react";
import { userService } from "../services/userService";
import { useAuthContext } from "../context/auth/useAuthContext";
import { isApiError } from "../types/apiTypes";
import type { BackendUsers } from "../types/packageTypes";

const ProfileInfo = () => {
  useEffect(() => {
    const fetchUser = async () => {
      const user = await userService.fetchUserById(
        "42821ea8-ba65-494e-8f82-9b30a26a7310"
      );
      console.log("Fetched user:", user);
    };
    fetchUser();
  }, []);

  return null;
};

export default ProfileInfo;
