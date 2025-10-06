import api from "./axios";

export async function addUser(userData) {
  const response = await api.post("/auth/signup", userData);
  return response;
}

export async function emailExists(email) {
  try {
    const response = await api.post("/auth/email-taken", { email });
    return response.data.taken;
  } catch (error) {
    console.error("Error checking email existence:", error);
    throw error;
  }
}
