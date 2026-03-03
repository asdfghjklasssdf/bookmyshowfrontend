/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useRouter, useParams } from "next/navigation";
import "../../../css/frontpage.css";
import "../../../css/terms.css";
 import { isLoggedIn } from "@/utils/auth";
import { logoutUser } from "@/services/auth";
import { useEffect, useState } from "react";
export default function TermsPage() {
  const router = useRouter();
  const { showId } = useParams();
const [checked, setChecked] = useState(false);
const [loggedIn, setLoggedIn] = useState(false);
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
        <div>

    <div className="terms-page">

      <div className="terms-card">
        <h1 className="terms-title">Terms & Conditions</h1>

        <ul className="terms-list">
          <li>✔ Tickets once booked cannot be cancelled.</li>
          <li>✔ Please arrive at least 15 minutes before showtime.</li>
          <li>✔ Outside food and beverages are not allowed.</li>
          <li>✔ Management reserves the right of admission.</li>
          <li>✔ Seat selection is final after confirmation.</li>
        </ul>

        <button
          className="terms-btn"
          onClick={() => router.push(`/book/food/${showId}`)}
        >
          Agree & Continue →
        </button>
      </div>

      {/* Footer */}
      

    </div>
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

        <div className="footer-bottom">BookMyShow</div>
      </footer>
       </div>
  );
}