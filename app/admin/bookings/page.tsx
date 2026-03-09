/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";

export default function AdminBookings() {

  const [bookings,setBookings] = useState<any[]>([]);

  const loadBookings = async () => {
    const data = await api("/bookings");
    setBookings(data);
  };

  useEffect(()=>{
    loadBookings();
  },[]);

  const cancelBooking = async (id:string)=>{

    if(!confirm("Cancel this booking?")) return;

    await api(`/bookings/${id}`,{
      method:"DELETE"
    });

    loadBookings();
  };

  return (
    <div>

      <h1>🎟 Admin Bookings</h1>

      <div className="admin-list">

        {bookings.map((b:any)=>{

          const show = b.showTimingId;

          return (

            <div key={b._id} className="admin-card">

              <h3>
                Booking #{b._id.slice(-6)}
              </h3>

              <p>
                🎬 Movie: {show?.movieId?.name || "N/A"}
              </p>

              <p>
                🏢 Theatre: {show?.theatreId?.name || "N/A"}
              </p>

              <p>
                🎭 Screen: {show?.screenId?.screenNumber || "N/A"}
              </p>

              <p>
                📅 Date: {new Date(show?.showDate).toDateString()}
              </p>

              <p>
                ⏰ {show?.startTime} - {show?.endTime}
              </p>

              <p>
                💺 Seats: {b.seats.join(", ")}
              </p>

              <p>
                💳 Payment: {b.paymentId?._id?.slice(-6)}
              </p>

              <p>
                💰 Total: ₹{b.totalAmount}
              </p>

              <p>
                📦 Status: {b.status}
              </p>

              <div className="card-actions">

                <button
                  className="delete-btn"
                  onClick={()=>cancelBooking(b._id)}
                >
                  Cancel Booking
                </button>

              </div>

            </div>

          );
        })}

      </div>

    </div>
  );
}