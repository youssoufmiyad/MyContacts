"use client";
import { useState } from "react";
import api from "../utils/axios";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

export function useAuth() {
  const [token, setToken] = useState(() => Cookies.get("token"));

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token } = res.data;

      setToken(token);
      Cookies.set("token", token, { expires: 7 });
      throw redirect("/contacts");
    } catch (err) {
      console.log(err || "Erreur de connexion");
    }
  };

  const logout = () => {
    setToken(null);
    Cookies.remove("token");
    window.location.reload();
  };

  return {
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };
}
