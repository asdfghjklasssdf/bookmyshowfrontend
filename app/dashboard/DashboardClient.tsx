/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../css/frontpage.css";
import { logoutUser } from "@/services/auth";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
const slides = [
  {
    image: "/login.png",
    title: "Book Movies, Events & Sports",
    text: "Experience cinema like never before 🍿",
  },
  {
    image: "/register.png",
    title: "Reserve Seats Instantly",
    text: "Fast booking with secure payments",
  },
  {
    image: "/forgetpassword.png",
    title: "Enjoy Premium Experience",
    text: "Movies • Sports • Concerts",
  },
];

const cricketMatches = [
  {
    title: "India vs Australia",
    venue: "T20 World Cup 2026",
    date: "21 March 2026",
  },
  {
    title: "India vs England",
    venue: "Super 8 Stage",
    date: "24 March 2026",
  },
  {
    title: "India vs Pakistan",
    venue: "Group Stage",
    date: "28 March 2026",
  },
  {
    title: "India vs New Zealand",
    venue: "Semi Final",
    date: "2 April 2026",
  },
  {
    title: "India vs South Africa",
    venue: "Final (Expected)",
    date: "6 April 2026",
  },
];

const categories = [
  { title: "Cricket", info: "T20 World Cup Events" },
  { title: "Movies", info: "Latest Releases" },
  { title: "Sports", info: "Live Matches" },
  { title: "Theatre", info: "Drama & Plays" },
  { title: "Events", info: "Special Shows" },
];

const standupShows = [
  { title: "Zakir Khan Live", info: "Standup Comedy Night" },
  { title: "Abhishek Upmanyu", info: "India Tour 2026" },
  { title: "Bassi Live", info: "Comedy Special" },
  { title: "Harsh Gujral", info: "Laugh Riot Tour" },
];

const concerts = [
  { title: "Arijit Singh Concert", info: "Live in Mumbai" },
  { title: "Diljit Dosanjh Tour", info: "India Tour 2026" },
  { title: "Anuv Jain Live", info: "Soulful Nights" },
  { title: "King Live", info: "Rap Concert" },
];

const CategoryMovies = [
  { title: " ", image: "/imagecategory1.png" },
  { title: " ", image: "/imagecategory2.png" },
  { title: " ", image: "/imagecategory3.png" },
];

const Personalized = [
  { title: " ", image: "/image.png" },
  { title: " ", image: "/imagefivth.png" },
  { title: " ", image: "/imagefourth.png" },
];


const trendingMovies = [
  { title: " ", image: "/imagefrst.png" },
  { title: " ", image: "/imagesecond.png" },
  { title: " ", image: "/imagethird.png" },
];
export default function Dashboard() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
    const [dark, setDark] = useState(false);

const [movies, setMovies] = useState<any[]>([]);
useEffect(() => {
  const timer = setInterval(() => {
    setIndex((prev) => (prev + 1) % slides.length);
  }, 3000);

  return () => clearInterval(timer);
}, []);
 useEffect(() => {
  const fetchMovies = async () => {
    const res = await fetch("http://localhost:4000/movies");
    const data = await res.json();
    setMovies(data);
  };

  fetchMovies();
}, []); 
  const nextSlide = () =>
    setIndex((prev) => (prev + 1) % slides.length);
const handleLogout = async () => {
  try {
    await logoutUser();

    // clear local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("loggedInUser");

    // redirect to login
    router.push("/login");
  } catch (err) {
    console.error("Logout failed");
  }
};

  const prevSlide = () =>
    setIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
    const handleToggle = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };
  return (
    <><div className="home-container">

      <header className="home-header">
        <h1 className="logo">🎬 BookMyShow</h1>

<IconButton onClick={handleToggle} color="inherit">
      {dark ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>

        <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
    </header><section className="last-banner">

        <img
          src={slides[index].image}
          className="banner-image"
          alt="banner" />

        <div className="last-overlay">
          <h2>{slides[index].title}</h2>
          <p>{slides[index].text}</p>


        </div>


        <button className="arrow left" onClick={prevSlide}>
          ❮
        </button>

        <button className="arrow right" onClick={nextSlide}>
          ❯
        </button>

      </section>
<section className="movies-section">
  <h2>🔥 Trending Now</h2>

  <div className="horizontal-scroll">
    {movies.map((movie) => (
      <div
        key={movie._id}
        className="cricket-card"
        onClick={() => router.push(`/movies/${movie._id}`)}
      >
        <img
          src={movie.posterUrl || "/imagefrst.png"}
          alt={movie.name}
          className="movie-img"
        />
        <h3>{movie.name}</h3>
      </div>
    ))}
  </div>
</section>
      <section className="movies-section">
        <h2>🎵 Live Concerts</h2>

        <div className="horizontal-scroll">
          {concerts.map((concert, i) => (
            <div key={i} className="cricket-card">
              <h3>{concert.title}</h3>
              <p>{concert.info}</p>
            </div>
          ))}
        </div>
      </section><section className="movies-section">
        <h2>✨ Personalized for You</h2>

        <div className="horizontal-scroll">
          {Personalized.map((Personal, i) => (
            <div key={i} className="movie-card">
              <img src={Personal.image} alt={Personal.title} className="movie-img" />
            </div>
          ))}
        </div>
      </section><section className="movies-section">
        <h2>😂 Standup Comedy</h2>

        <div className="horizontal-scroll">
          {standupShows.map((show, i) => (
            <div key={i} className="cricket-card">
              <h3>{show.title}</h3>
              <p>{show.info}</p>
            </div>
          ))}
        </div>
      </section><section className="movies-section">
        <h2>🎥 Category</h2>

        <div className="horizontal-scroll">
          {CategoryMovies.map((showw, i) => (
            <div key={i} className="cricket-card">
              <img src={showw.image} alt={showw.title} className="movie-img" />
            </div>
          ))}
        </div>
      </section><section className="movies-section">
        <h2>🏏 T20 World Cup – India Matches</h2>

        <div className="horizontal-scroll">
          {cricketMatches.map((match, i) => (
            <div key={i} className="cricket-card">
              <h3>{match.title}</h3>
              <p>{match.venue}</p>
              <span>{match.date}</span>
            </div>
          ))}
        </div>
      </section><section className="movies-section">
        <h2>🎯 Categories for You</h2>

        <div className="horizontal-scroll">
          {categories.map((item, i) => (
            <div key={i} className="cricket-card">
              <h3>{item.title}</h3>
              <p>{item.info}</p>
            </div>
          ))}
        </div>
      </section>
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
    </>
  );
}