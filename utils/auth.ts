export const isLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("accessToken");

  return !!token; 
};

export const isAdmin = (): boolean => {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("accessToken");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role === "admin";
  } catch {
    return false;
  }
};