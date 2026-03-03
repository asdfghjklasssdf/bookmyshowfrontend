/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = "http://localhost:4000";

export const api = async (endpoint: string, options: any = {}) => {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(API_URL + endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (res.status === 401) {
    localStorage.clear();
    window.location.href = "/login";
  }

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};