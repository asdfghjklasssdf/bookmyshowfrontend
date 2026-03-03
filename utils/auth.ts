export const isLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("accessToken");

  return !!token; // true only if token exists
};