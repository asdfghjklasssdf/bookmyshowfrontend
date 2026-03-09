/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useState } from "react";
import { getWishlist, removeWishlist } from "@/services/wishlist";

export default function WishlistPage(){

  const [movies,setMovies] = useState<any[]>([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    load();
  },[]);

  const load = async () => {

    const data = await getWishlist();

    const list = data.map((w:any)=>w.movieId);

    setMovies(list);

    setLoading(false);
  };

  const remove = async (movieId:string)=>{

    await removeWishlist(movieId);

    setMovies(prev => prev.filter(m=>m._id !== movieId));
  };

  if(loading) return <p>Loading wishlist...</p>;

  return(

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        ❤️ My Watchlist
      </h1>

      {movies.length === 0 && <p>No movies in wishlist</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {movies.map((m:any)=>(
          <div key={m._id}>

            <img
              src={m.posterUrl}
              className="w-full h-72 object-cover"
            />

            <h3>{m.name}</h3>

            <button
              onClick={()=>remove(m._id)}
            >
              Remove ❌
            </button>

          </div>
        ))}

      </div>

    </div>

  );
}