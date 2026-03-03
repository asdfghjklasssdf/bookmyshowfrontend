/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../app/css/frontpage.css";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function Navbar() {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // check theme + auth
  useEffect(() => {
    const isDark =
      document.documentElement.classList.contains("dark");

    setDarkMode(isDark);

    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleToggle = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    setDarkMode(html.classList.contains("dark"));
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="navbar">
      <header className="home-header">
        <h1 className="logo">🎬 BookMyShow</h1>

        <div className="header-actions">

          <IconButton onClick={handleToggle}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {isLoggedIn ? (
            <>
              <button
                className="login-btn"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </button>

              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button
              className="login-btn"
              onClick={() => router.push("/login")}
            >
              Login to Continue
            </button>
          )}

        </div>
      </header>
    </nav>
  );
}