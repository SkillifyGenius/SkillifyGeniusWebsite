"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types";

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  switchRole: (newRole: UserRole) => void;
  login: (role: UserRole) => void;
  logout: () => void;
}

const DEFAULT_USERS: Record<UserRole, User> = {
  student: {
    id: "user-101",
    userId: "student-101",
    name: "Liam Vance",
    email: "liam@example.com",
    role: "student",
    studentId: "student-101",
    createdAt: new Date().toISOString(),
  },
  parent: {
    id: "user-201",
    userId: "parent-201",
    name: "Elena Vance",
    email: "elena.vance@example.com",
    role: "parent",
    studentId: "student-101",
    createdAt: new Date().toISOString(),
  },
  mentor: {
    id: "user-301",
    userId: "mentor-301",
    name: "Alex",
    email: "alex@skillifygenius.com",
    role: "mentor",
    createdAt: new Date().toISOString(),
  },
  admin: {
    id: "user-401",
    userId: "admin-401",
    name: "Platform Director",
    email: "admin@skillifygenius.com",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>("student");
  const [user, setUser] = useState<User | null>(DEFAULT_USERS.student);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    const savedRole = localStorage.getItem("skillify_active_role") as UserRole;
    if (savedRole && DEFAULT_USERS[savedRole]) {
      setRole(savedRole);
      setUser(DEFAULT_USERS[savedRole]);
    }
  }, []);

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    setUser(DEFAULT_USERS[newRole]);
    localStorage.setItem("skillify_active_role", newRole);
  };

  const login = (newRole: UserRole) => {
    switchRole(newRole);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        switchRole,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
