/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import "../../../css/frontpage.css";
import "../../../css/success.css"; 
import { isLoggedIn } from "@/utils/auth";
import { logoutUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function SuccessPage() {
  const { bookingId } = useParams();
  const [checked, setChecked] = useState(false);
const [loggedIn, setLoggedIn] = useState(false);
const router = useRouter();
useEffect(() => {
  const auth = isLoggedIn();

  if (!auth) {
    router.replace("/login");
    return;
  }

  setLoggedIn(true);
  setChecked(true);
}, [router]);
return (
  <div className="success-page">

    <div className="success-card">
      <div className="success-icon">✅</div>

      <h1>Booking Successful!</h1>

      <p className="booking-id">
        Booking ID: <strong>{bookingId}</strong>
      </p>

      <p className="thank-text">
        Thank you for booking with BookMyShow 🎬
      </p>

      <button
        className="home-btn"
        onClick={() => router.push("/dashboard")}
      >
        Back to Home →
      </button>
    </div>

    {/* FOOTER (same as yours) */}
    <footer className="footer">
      <div className="footer-top">

        <div className="footer-col">
          <h2 className="footer-logo">🎬 BookMyShow</h2>
          <p>
            Book movies, events, sports and experiences near you.
            Enjoy seamless ticket booking anytime.
          </p>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li>Movies</li>
            <li>Events</li>
            <li>Sports</li>
            <li>Offers</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Explore</h3>
          <ul>
            <li>Stream</li>
            <li>Gift Cards</li>
            <li>Corporates</li>
            <li>Support</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <span>📘</span>
            <span>📸</span>
            <span>🐦</span>
            <span>▶️</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        BookMyShow
      </div>
    </footer>

  </div>
);
}