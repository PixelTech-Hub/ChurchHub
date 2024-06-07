import { UserProfile } from '@/Models/Users';
import { useAppDispatch } from '@/app/hooks';
import { login } from '@/features/users/userSlice';
import { User } from '@/types/User';
import { unwrapResult } from '@reduxjs/toolkit';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
  user: UserProfile | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loginUser: (email: string, password: string) => void;
  logoutUser: () => void;
  isLoggedIn: () => boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("accessToken");
    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setAccessToken(storedToken);
      setIsAuthenticated(true);
      axios.defaults.headers.common["Authorization"] = "Bearer " + storedToken;
    }
    setIsReady(true);
  }, []);

  const loginUser = async (email: string, password: string) => {
    try {
      const actionResult = await dispatch(login({ email, password } as User));
      const res = unwrapResult(actionResult);
      if (res) {
        const token = res.accessToken;
        const userObj = {
          name: res.name,
          email: res.email,
        };
        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(userObj));
        setAccessToken(token);
        setUser(userObj);
        setIsAuthenticated(true);
        toast.success("Login Success!");
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        navigate("/app");
      }
    } catch (e: any) {
      toast.error("Server error occurred");
    }
  };

  const isLoggedIn = () => {
    return isAuthenticated;
  };

  const logoutUser = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    setAccessToken(null);
    axios.defaults.headers.common["Authorization"] = "";
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, isAuthenticated, loginUser, logoutUser, isLoggedIn }}
    >
      {isReady && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
