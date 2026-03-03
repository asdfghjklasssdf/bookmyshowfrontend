/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/utils/api";
import { useBooking } from "@/app/context/BookingContext";
import "../../css/frontpage.css";
import "../../css/seelectime.css";
import { isLoggedIn } from "@/utils/auth";

export default function ShowSelection() {
  const { movieId } = useParams();
  const router = useRouter();
  const { setBooking } = useBooking();

  const [shows, setShows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadShows = async () => {
      try {
        const data = await api(`/show-timings/movie/${movieId}`);
        console.log("SHOW DATA:", data);
        setShows(data);
      } catch (err) {
        console.error("Failed to load shows");
      } finally {
        setLoading(false);
      }
    };

    loadShows();
  }, [movieId]);

  useEffect(() => {
    const auth = isLoggedIn();

    if (!auth) {
      router.replace("/login");
      return;
    }
  }, [router]);

  if (loading)
    return <h2 style={{ padding: 20 }}>Loading shows...</h2>;

  /* 🔥 GROUP BY THEATRE ID (NOT NAME) */
  const groupedShows = shows.reduce((acc: any, show: any) => {
    const theatreKey =
      show.theatreId?._id || show.theatreId;

    if (!acc[theatreKey]) {
      acc[theatreKey] = {
        name: show.theatreId?.name || "Unknown Theatre",
        shows: [],
      };
    }

    acc[theatreKey].shows.push(show);
    return acc;
  }, {});

  return (
    <div>
      <div className="show-page">

        <h1 className="show-title">Select Show Timing 🎬</h1>

        <div className="shows-container">
          {Object.entries(groupedShows).map(
            ([theatreId, theatreData]: any) => (
              <div key={theatreId} className="show-card">

                <h3>{theatreData.name}</h3>

                <div className="time-buttons">
                  {theatreData.shows.map((show: any) => (
                    <button
                      key={show._id}
                      className="show-btn"
                      onClick={() => {
                        setBooking((prev: any) => ({
                          ...prev,
                          show,
                        }));

                        router.push(`/book/seats/${show._id}`);
                      }}
                    >
                      {show.startTime}
                    </button>
                  ))}
                </div>

              </div>
            )
          )}
        </div>

      </div>

      {/* FOOTER */}
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