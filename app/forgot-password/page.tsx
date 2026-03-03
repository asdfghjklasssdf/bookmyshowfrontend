"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "../css/forgot.css";
import { forgotPassword } from "@/services/auth";
import { useEffect } from "react";
import { isLoggedIn } from "@/utils/auth";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSendOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await forgotPassword(email);
      localStorage.setItem("resetEmail", email);
      router.push("/verify-otp");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };
useEffect(() => {
  if (isLoggedIn()) {
    router.replace("/dashboard");
  }
}, []);
  return (
    <div className="auth-page">

      <Image
        src="/try.png"
        alt="Background"
        fill
        priority
        className="bg-image"
      />

      <div className="bg-overlay" />

      <div className="hero-text">
        <h2>Forgot Password?</h2>
        <p>Reset your account securely </p>
      </div>

      <div className="auth-card">
        <h1>Forgot Password</h1>

        <form onSubmit={handleSendOtp}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button className="auth-btn">Send OTP</button>
        </form>
      </div>
    </div>
  );
}