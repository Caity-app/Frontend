import { useLocation, useNavigate } from "react-router";
import { AuthContextType } from "../@types/auth";
import { PropsWithChildren, createContext, useState } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  
    const updateToken = (token: string) => {
        setToken(token);
        localStorage.setItem("token", token);

        const originalPath = location.state?.from?.pathname || "/"; 
        navigate(originalPath);
    };
  
    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem("token");
        navigate("/login");
    };
  
    const value: AuthContextType = {
      token,
      updateToken: updateToken,
      handleLogout: handleLogout,
    };
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
};
