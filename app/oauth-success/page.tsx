"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OAuthSuccess() {

  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {

    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const email = params.get("email");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }

    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    if (email) {
      localStorage.setItem("loggedInUser", JSON.stringify({ email }));
    }

    router.push("/dashboard");

  }, []);

  return <p>Logging you in...</p>;
}