"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "../css/login.css";
import { loginUser } from "@/services/auth";
import { useEffect } from "react";
import { isLoggedIn } from "@/utils/auth";
export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await loginUser({ email, password });
      router.push("/dashboard");
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
    <div className="login-page">

      <Image
        src="/try.png"
        alt="Cinema Background"
        fill
        priority
        className="bg-image"
      />

      <div className="bg-overlay"></div>

      <div className="hero-text">
        <h2>Enjoy Premium Experience</h2>
        <p>Movies • Sports • Concerts</p>
      </div>

      <div className="login-card">
        <h1>Login</h1>
  <p className="signuplink">
        Email:
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
   <p className="signuplink">
        Password:
        </p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />

          <Link className="signuplink" href="/forgot-password">
            Forgot Password
          </Link>

          {error && <p className="error">{error}</p>}

          <button className="btn-login">Login to Continue</button>
        </form>

        <p className="signuplink">
          Don’t have account? <Link href="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}