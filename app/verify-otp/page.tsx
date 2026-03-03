/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "../css/forgot.css";
import { verifyOtp } from "@/services/auth";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const email = localStorage.getItem("resetEmail");

      if (!email) {
        setError("Email missing. Restart flow.");
        return;
      }

      await verifyOtp({ email, otp, newPassword });

      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };


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
        <h2>Verify OTP</h2>
        <p>Secure your account access </p>
      </div>

      <div className="auth-card">
        <h1>Verify OTP</h1>

        <form onSubmit={handleReset}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button className="auth-btn">Reset Password</button>
        </form>
      </div>
    </div>
  );
}