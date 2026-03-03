/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState ,useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useBooking } from "@/app/context/BookingContext";
import "../../../css/frontpage.css";
import "../../../css/contact.css";
 import { isLoggedIn } from "@/utils/auth";
import { logoutUser } from "@/services/auth";
export default function ContactPage() {
  const router = useRouter();
  const { showId } = useParams();
  const { setBooking } = useBooking();
const [checked, setChecked] = useState(false);
const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
  <div className="contact-page">

    <div className="contact-card">
      <h1>📩 Contact Details</h1>
      <p className="subtitle">
        Enter your details to continue booking
      </p>

      <input
        className="contact-input"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="contact-input"
        placeholder="Phone"
        onChange={(e) => setPhone(e.target.value)}
      />

      <button
        className="continue-btn"
        onClick={() => {
          setBooking((p: any) => ({
            ...p,
            contact: { email, phone },
          }));

          router.push(`/book/payment/${showId}`);
        }}
      >
        Continue →
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
