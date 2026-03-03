/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter, useParams } from "next/navigation";
import { useBooking } from "@/app/context/BookingContext";
import "../../../css/frontpage.css";
import "../../../css/food.css";
import { isLoggedIn } from "@/utils/auth";
import { logoutUser } from "@/services/auth";
import { useEffect, useState } from "react";

const foods = [
  { name: "Popcorn", price: 200, emoji: "🍿" },
  { name: "Nachos", price: 150, emoji: "🧀" },
  { name: "Cold Drink", price: 120, emoji: "🥤" },
  { name: "Burger", price: 180, emoji: "🍔" },
];

export default function FoodPage() {
  const router = useRouter();
  const { showId } = useParams();
  const { booking, setBooking } = useBooking();
const [checked, setChecked] = useState(false);
const [loggedIn, setLoggedIn] = useState(false);
  const addFood = (food: any) => {
    setBooking((prev: any) => ({
      ...prev,
      food: [...(prev.food || []), food],
    }));
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
        <div>

    <div className="food-page">

      <h1 className="food-title">Food & Beverages 🍿</h1>

      <div className="food-grid">
        {foods.map((f) => (
          <div key={f.name} className="food-card">
            <h2>{f.emoji} {f.name}</h2>
            <p>₹{f.price}</p>

            <button
              className="add-food-btn"
              onClick={() => addFood(f)}
            >
              Add +
            </button>
          </div>
        ))}
      </div>

      {/* Selected preview */}
      <div className="selected-food">
        <h3>Selected Items:</h3>
        {booking.food?.length ? (
          <p>
            {booking.food.map((f: any) => f.name).join(", ")}
          </p>
        ) : (
          <p>None</p>
        )}
      </div>

      <button
        className="continue-btn"
        onClick={() => router.push(`/book/contact/${showId}`)}
      >
        Continue →
      </button>



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