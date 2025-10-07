"use client";
import { useState } from "react";
import api from "../utils/axios";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

export function useAuth() {
  const [token, setToken] = useState(() => Cookies.get("token"));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;

      setToken(token);
      setUser(user);
      Cookies.set("token", token, { expires: 7 });
      throw redirect("/contacts");
    } catch (err) {
      console.log(err || "Erreur de connexion");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return {
    token,
    user,
    login,
    logout,
    isAuthenticated: !!token,
  };
}
