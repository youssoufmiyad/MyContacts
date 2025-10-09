"use client";
import { useState } from "react";
import api from "../utils/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
export function useAuth() {
  const [token, setToken] = useState(() => Cookies.get("token"));
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token } = res.data;

      setToken(token);
      Cookies.set("token", token, { expires: 7 });
      navigate("/contacts");
      window.location.reload();
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
