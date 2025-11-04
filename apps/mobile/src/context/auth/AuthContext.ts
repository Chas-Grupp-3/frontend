import { createContext } from "react";
import type { AuthContextType } from "../../types/authTypes";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
