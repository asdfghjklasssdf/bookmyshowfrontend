/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
 
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
 import { isLoggedIn } from "@/utils/auth";
import { logoutUser } from "@/services/auth";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getMovieById } from "@/services/movies";
import "../../css/moivepage.css";
import { rateMovie, getRatings, getRatingStats } from "@/services/ratings";
export default function MovieDetails() {
  const params = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
const [checked, setChecked] = useState(false);
const [loggedIn, setLoggedIn] = useState(false);
const [rating,setRating] = useState(0);
const [review,setReview] = useState("");
const [ratings,setRatings] = useState<any[]>([]);
const [stats,setStats] = useState<any>(null);
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
  useEffect(()=>{
  if(movie){
    loadRatings();
  }
},[movie]);
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
const loadRatings = async () => {

  if(!movie?._id) return;

  const r = await getRatings(movie._id);
  const s = await getRatingStats(movie._id);

  setRatings(r);
  setStats(s);

};
const submitRating = async () => {

  if(!rating){
    alert("Select rating");
    return;
  }

  await rateMovie({
    movieId: movie._id,
    rating,
    review
  });

  alert("Rating submitted ⭐");

  setRating(0);
  setReview("");

  loadRatings();

};
const timeAgo = (date:string) => {

  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 }
  ];

  for (const i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count >= 1) {
      return `${count} ${i.label}${count>1?"s":""} ago`;
    }
  }

  return "just now";
};
  return (
    <div>
    <div className="movie-page">

      <div className="hero">

        <div className="banner">
          <img
            src={movie.bannerUrl || "/default-banner.jpg"}
            alt={movie.name}
          />
          <div className="banner-overlay"></div>
        </div>

        <div className="movie-info">
          <img
            src={movie.posterUrl || "/default-poster.jpg"}
            className="poster"
            alt={movie.name}
          />

          <div className="info">
            <h1>{movie.name} 🎬</h1>
{stats && (
<p>
⭐ {stats.avgRating?.toFixed(1) || 0} / 5  
({stats.totalRatings} ratings)
</p>
)}            <p>⏱ Duration: {movie.duration}</p>
            <p>🎯 Age Rating: {movie.ageRating}</p>
            <p>🌍 Languages: {movie.language?.join(", ")}</p>
            <p>🎭 Genres: {movie.genres?.join(", ")}</p>

            <button
              className="book-btn"
              onClick={() => router.push(`/book/${movie._id}`)}
            >
              🎟️ Book Tickets
            </button>
            <button
  onClick={async () => {

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wishlist/${movie._id}`,
      {
        method:"POST",
        headers:{
          Authorization:`Bearer ${localStorage.getItem("accessToken")}`
        }
      }
    );

    alert("Added to wishlist ❤️");

  }}
>
❤️ Add to Watchlist
</button>
          </div>
        </div>

      </div>
<section className="rating-section">

<h2>⭐ Rate This Movie</h2>

<div className="rating-stars">

{[1,2,3,4,5].map((r)=>(
  <span
    key={r}
    style={{
      cursor:"pointer",
      fontSize:"28px",
      color: r <= rating ? "gold" : "gray"
    }}
    onClick={()=>setRating(r)}
  >
    ★
  </span>
))}

</div>

<textarea
  placeholder="Write review..."
  value={review}
  onChange={(e)=>setReview(e.target.value)}
/>

<button onClick={submitRating}>
Submit Rating
</button>

</section><section className="reviews">

<h2>User Reviews</h2>

{ratings.length === 0 && <p>No reviews yet</p>}

{ratings.map((r:any)=>(
  <div key={r.id} className="review-card">

    <strong>@{r.username}</strong>

    <p>
      {"⭐".repeat(r.rating)}
    </p>

    <p>{r.review}</p>

    <small style={{color:"#888"}}>
      {timeAgo(r.createdAt)}
    </small>

    {/* <div style={{marginTop:"5px"}}>
      <button style={{marginRight:"10px"}}>
        👍 {r.likes || 0}
      </button>

      <button>
        👎 {r.dislikes || 0}
      </button>
    </div> */}

  </div>
))}

</section>
      <section className="description">
        <h2>Description</h2>
        <p>{movie.description}</p>
      </section>

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

      <section className="similar">
        <h2>Similar Movies</h2>
        <div className="similar-list">
          <div className="similar-card"></div>
          <div className="similar-card"></div>
          <div className="similar-card"></div>
          <div className="similar-card"></div>
        </div>
      </section>



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