/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
 import { isLoggedIn } from "@/utils/auth";
import { logoutUser } from "@/services/auth";

import { useEffect, useState } from "react";
import { getMovies } from "@/services/movies";
import { useRouter } from "next/navigation";
import "../css/moivepage.css";
export default function MoviesPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
const [checked, setChecked] = useState(false);
const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (err) {
        console.error("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);
useEffect(() => {
  const auth = isLoggedIn();

  if (!auth) {
    router.replace("/login");
    return;
  }

  setLoggedIn(true);
  setChecked(true);
}, [router]);
  if (loading) return <h2>Loading movies...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Movies 🎬</h1>

      {movies.map((movie) => (
        <div
          key={movie._id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            cursor: "pointer",
          }}
          onClick={() => router.push(`/movies/${movie._id}`)}
        >
          <h3>{movie.name}</h3>
          <p>{movie.description}</p>
        </div>
      ))}
    </div>
  );
}