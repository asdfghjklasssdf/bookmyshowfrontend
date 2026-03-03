/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { api } from "@/utils/api";
import { useBooking } from "@/app/context/BookingContext";
import { useRouter } from "next/navigation";
import '../../../css/frontpage.css';
import '../../../css/payment.css';
import { isLoggedIn } from "@/utils/auth";
import { logoutUser } from "@/services/auth";
import { useState,useEffect } from "react";
export default function PaymentPage() {
  const { booking } = useBooking();
  const router = useRouter();
const [checked, setChecked] = useState(false);
const [loggedIn, setLoggedIn] = useState(false);
  const payNow = async () => {
    const payment = await api("/payments", {
      method: "POST",
      body: JSON.stringify({
        amount: 300,
        totalAmount: 300,
      }),
    });

    const bookingRes = await api("/bookings", {
      method: "POST",
      body: JSON.stringify({
        showTimingId: booking.show._id,
        seats: booking.seats,
        paymentId: payment._id,
        totalAmount: 300,
      }),
    });

    router.push(`/book/success/${bookingRes._id}`);
  };
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
  <div className="payment-page">

    <div className="payment-card">
      <h1>💳 Payment</h1>
      <p className="subtitle">Choose your payment method</p>

      {/* Payment Methods */}
      <div className="payment-methods">

        <label className="payment-option">
          <input type="radio" name="payment" defaultChecked />
          <span>💳 Credit / Debit Card</span>
        </label>

        <label className="payment-option">
          <input type="radio" name="payment" />
          <span>📱 UPI</span>
        </label>

        <label className="payment-option">
          <input type="radio" name="payment" />
          <span>🏦 Net Banking</span>
        </label>

        <label className="payment-option">
          <input type="radio" name="payment" />
          <span>👛 Wallet</span>
        </label>

      </div>

      {/* Card Inputs (UI only) */}
      <div className="card-form">
        <input className="pay-input" placeholder="Card Number" />
        <input className="pay-input" placeholder="Card Holder Name" />

        <div className="row">
          <input className="pay-input" placeholder="MM/YY" />
          <input className="pay-input" placeholder="CVV" />
        </div>
      </div>

      <button className="pay-btn" onClick={payNow}>
        Pay Now →
      </button>
    </div>

    {/* FOOTER SAME */}
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