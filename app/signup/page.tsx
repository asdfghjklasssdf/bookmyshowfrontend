/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "../css/Signup.css";
import { logoutUser } from "@/services/auth";
import { registerUser } from "@/services/auth";
import { useEffect } from "react";
import { isLoggedIn } from "@/utils/auth";
interface FormErrors {
  form?: string;
}

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
const [checked, setChecked] = useState(false);
const [loggedIn, setLoggedIn] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrors({ form: "Passwords do not match" });
      return;
    }

    try {
      await registerUser({
        fullName,
        username,
        email,
        phone,
        bio,
        password,
      });

      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrors({ form: err.message });
      }
    }
  };
useEffect(() => {
  if (isLoggedIn()) {
    router.replace("/dashboard");
  }
}, []);

  return (
    <div className="signup-page">

      <Image
        src="/try.png"
        alt="Cinema Background"
        fill
        priority
        className="bg-image"
      />

      <div className="bg-overlay"></div>

      <div className="hero-text">
        <h2>Join BookMyShow</h2>
        <p>Create account & start booking instantly 🎬</p>
      </div>

      <div className="signup-card">
        <h1>Create Account</h1>

        <form onSubmit={handleSubmit}>
            <p className="signuplink">
        Full Name:
        </p>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
          />
  <p className="signuplink">
        Username:
        </p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
  <p className="signuplink">
        Email:
        </p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
  <p className="signuplink">
        Phone:
        </p>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
          />
  <p className="signuplink">
        Bio:
        </p>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
          />
  <p className="signuplink">
        Password:
        </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
  <p className="signuplink">
        Confirm Password:
        </p>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />

          {errors.form && <p className="error">{errors.form}</p>}

          <button className="btn-signup">Create Account</button>
        </form>

        <p className="login-link">
          Already have account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}