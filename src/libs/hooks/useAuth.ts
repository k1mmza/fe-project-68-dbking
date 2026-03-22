'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { LoginCredentials, RegisterData } from '../types';

export const useAuth = () => {
  // status can be "loading", "authenticated", or "unauthenticated"
  const { data: session, status } = useSession();

  // Step 1: Register (Usually still a direct fetch to your API)
  const register = async (data: RegisterData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    
    if (!res.ok) throw new Error("Registration failed");
    
    // After registering, we usually log them in automatically
    return await login({ email: data.email, password: data.password });
  };

  // Step 2 & 9: Login (Uses Next-Auth Provider)
  const login = async (credentials: LoginCredentials) => {
    return await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  // Step 8: Logout
  const logout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return { 
    user: session?.user ?? null, 
    login, 
    register, 
    logout, 
    loading: status === "loading", 
    isAdmin: session?.user?.role === 'admin' 
  };
};