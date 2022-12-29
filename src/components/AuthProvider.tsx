import {useState, PropsWithChildren, createContext, useContext} from "react";
import { useLocation, useNavigate } from "react-router-dom";

const fakeAuth = async () => {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve("token");
        }, 250);
    });
};

interface AuthContextType {
    token: string | null;
    onLogin: () => Promise<void>;
    onLogout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [token, setToken] = useState<string | null>(null);
  
    const handleLogin = async () => {
      const token: string = await fakeAuth();
  
      setToken(token);

      const originalPath = location.state?.from?.pathname || "/"; 
      navigate(originalPath);
    };
  
    const handleLogout = () => {
      setToken(null);
    };
  
    const value: AuthContextType = {
      token,
      onLogin: handleLogin,
      onLogout: handleLogout,
    };
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
};