/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useState } from "react";
import { getMyBookings } from "@/services/bookings";

export default function BookingHistory() {

  const [bookings,setBookings] = useState<any[]>([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    load();
  },[]);

  const load = async () => {
    const data = await getMyBookings();

    console.log("BOOKINGS API:", data);

    setBookings(data);
    setLoading(false);
  };

  if(loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6 text-center">
        🎟 My Bookings
      </h1>

      {bookings.length === 0 && (
        <p className="text-center text-gray-500">
          No bookings yet
        </p>
      )}

      <div className="space-y-6">

        {bookings.map((b:any)=>(

          <div
            key={b._id}
            className="flex gap-6 bg-white shadow-md rounded-xl p-4 border"
          >

            <img
              src={b.showTimingId.movieId.poster}
              alt="poster"
              className="w-24 h-36 object-cover rounded-lg"
            />

            <div className="flex-1">

              <h2 className="text-xl font-semibold">
                {b.showTimingId.movieId.name}
              </h2>

              <p className="text-gray-600">
                🎥 {b.showTimingId.theatreId.name}
              </p>

              <p className="text-gray-600">
                🪑 Seats: {b.seats.join(", ")}
              </p>

              <p className="text-gray-600">
                📅 {new Date(b.createdAt).toLocaleDateString()}
              </p>

              <p className="text-lg font-bold text-green-600">
                ₹{b.totalAmount}
              </p>

            </div>

            <div className="flex flex-col justify-between items-end">

              <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                {b.status}
              </span>

              <button className="text-sm text-blue-600 hover:underline">
                View Ticket
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}