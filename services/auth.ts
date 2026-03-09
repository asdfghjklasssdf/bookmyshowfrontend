import { api } from "@/utils/api";

interface AuthPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  fullName: string;
  username: string;
  email: string;
  phone?: string;
  bio?: string;
  password: string;
}

interface VerifyOtpPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export const registerUser = (data: RegisterPayload) =>
  api("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const loginUser = async (data: AuthPayload) => {
  const res = await api("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res || !res.accessToken) {
    throw new Error("Login failed");
  }

  localStorage.setItem("accessToken", res.accessToken);
  localStorage.setItem("refreshToken", res.refreshToken);
  localStorage.setItem("loggedInUser", JSON.stringify(res.user));

  return res;
};

export const forgotPassword = (email: string) =>
  api("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

export const verifyOtp = (data: VerifyOtpPayload) =>
  api("/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const logoutUser = () =>
  api("/auth/logout", { method: "POST" });
