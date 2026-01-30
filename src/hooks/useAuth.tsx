import { createContext, useContext, useMemo, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import { useLocalStorage } from "./useLocalStorage";
import type { UserLoginApiReturn } from "../types";
import { loginUser } from "../services/UserService";
import { getToken, removeToken, setToken } from "src/utils/token/tokenStorage";
import client from "src/api/axios/client";

interface DecodedToken {
  exp: number; 
}

interface AuthContextType {
  token: string | null;
  login: (
    { username, password }: { username: string; password: string },
    path?: string
  ) => Promise<UserLoginApiReturn>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(() => getToken());
  const navigate = useNavigate();

  useEffect(() => {

    const checkToken = async () => {
      // if (token && isTokenExpired(token)) {
      //   logout(); 
      // }
    }

    checkToken(); 

  }, []);

  const login = async (
    { username, password }: { username: string; password: string },
    path: string = "/"
  ): Promise<UserLoginApiReturn> => {
    try {
      const { token, error } = await loginUser(username, password);

      if (token !== null) {
        if (isTokenExpired(token)) {
          return { token: null, error };
        }

        setToken(token); 
        setTokenState(token);

        navigate(path);
        return { token };
      }
      return { token: null, error };
    } catch (error) {
      return { token: null, error } as UserLoginApiReturn;
    }
  };

  const logout = () => {
    removeToken(); 
    setTokenState(null);
    navigate('/login')
  };

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      if (decoded.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime; 
      }
      return false; 
    } catch (error) {
      return true;
    }
  };

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
    }),
    [token] 
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};