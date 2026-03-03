/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
 import { isLoggedIn } from "@/utils/auth";
import { logoutUser } from "@/services/auth";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getMovieById } from "@/services/movies";
import "../../css/moivepage.css";

export default function MovieDetails() {
  const params = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
const [checked, setChecked] = useState(false);
const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (!params?.id) return;

        const data = await getMovieById(params.id as string);
        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [params?.id]);
useEffect(() => {
  const auth = isLoggedIn();

  if (!auth) {
    router.replace("/login");
    return;
  }

  setLoggedIn(true);
  setChecked(true);
}, [router]);
  if (loading) return <h2>Loading movie...</h2>;
  if (!movie) return <h2>Movie not found</h2>;

  return (
    <div>
    <div className="movie-page">

      {/* HERO SECTION */}
      <div className="hero">

        {/* Banner */}
        <div className="banner">
          <img
            src={movie.bannerUrl || "/default-banner.jpg"}
            alt={movie.name}
          />
          <div className="banner-overlay"></div>
        </div>

        {/* Movie Info OVER Banner */}
        <div className="movie-info">
          <img
            src={movie.posterUrl || "/default-poster.jpg"}
            className="poster"
            alt={movie.name}
          />

          <div className="info">
            <h1>{movie.name} 🎬</h1>
            <p>⭐ Rating: {movie.rating}</p>
            <p>⏱ Duration: {movie.duration}</p>
            <p>🎯 Age Rating: {movie.ageRating}</p>
            <p>🌍 Languages: {movie.language?.join(", ")}</p>
            <p>🎭 Genres: {movie.genres?.join(", ")}</p>

            <button
              className="book-btn"
              onClick={() => router.push(`/book/${movie._id}`)}
            >
              🎟️ Book Tickets
            </button>
          </div>
        </div>

      </div>

      {/* Description */}
      <section className="description">
        <h2>Description</h2>
        <p>{movie.description}</p>
      </section>

      {/* Cast */}
      <section className="cast">
        <h2>Cast</h2>
        <div className="cast-list">
          {movie.cast?.map((actor: any) => (
            <div key={actor.name} className="cast-card">
              <img src={actor.image} alt={actor.name} />
              <p>{actor.name}</p>
              <small>{actor.role}</small>
            </div>
          ))}
        </div>
      </section>

      {/* Similar Movies */}
      <section className="similar">
        <h2>Similar Movies</h2>
        <div className="similar-list">
          <div className="similar-card"></div>
          <div className="similar-card"></div>
          <div className="similar-card"></div>
          <div className="similar-card"></div>
        </div>
      </section>

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