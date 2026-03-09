/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/utils/api";
import SeatPicker from "react-seat-picker";
import { useBooking } from "@/app/context/BookingContext";
import '../../../css/frontpage.css';
import '../../../css/seatbooking.css';
 import { isLoggedIn } from "@/utils/auth";
import { logoutUser } from "@/services/auth";
import SeatLegend from "@/components/SeatLegend";
import SeatLayout from "@/components/SeatLayout";
import SeatSummary from "@/components/SeatSummary";
export default function SeatsPage() {
  const { showId } = useParams();
  const router = useRouter();
  const { booking, setBooking } = useBooking();

  const [rows, setRows] = useState<any[]>([]);
  const [layout, setLayout] = useState<any>(null);
  const [selected, setSelected] = useState<string[]>([]);
const [checked, setChecked] = useState(false);
const [loggedIn, setLoggedIn] = useState(false);
useEffect(() => {
  const load = async () => {
    const layoutData = await api(
      `/screen-layout/${booking.show.screenId}`
    );

    const unavailable = await api(
      `/booked-seats/${showId}`
    );

    setLayout(layoutData);

const grouped: Record<string, any[]> = {};
layoutData.seats.forEach((seat: any) => {
 const seatKey = seat.seatKey.toUpperCase();
  const row = seat.row || seatKey.split("-")[0];

  if (!grouped[row]) {
    grouped[row] = [];
  }

  const isLocked = unavailable.locked.includes(seatKey);
  const isBooked = unavailable.booked.includes(seatKey);
  const seatNumber = parseInt(seat.number || seatKey.split("-")[1]);

const addGap =
  seatNumber === 6 || seatNumber === 11;

if (seatNumber === 6 || seatNumber === 11) {
grouped[row].push({
  id: `${row}-gap-${seatNumber}`,
  number: "",
  isReserved: true,
  isGap: true,
});
}
grouped[row].push({
  id: seatKey,
  number: seat.number || seatKey.split("-")[1],
  type: seat.type, 
  isSelected: false,
  isReserved: isLocked || isBooked,
  tooltip: isBooked
    ? `Booked (${seat.type})`
    : isLocked
    ? `Locked (${seat.type})`
    : `${seatKey} (${seat.type})`,
});
});
const formattedRows = Object.entries(grouped).map(
  ([rowLabel, seats]) => {
    return [
      {
        id: `${rowLabel}-label`,
        number: rowLabel,
        isReserved: true,
      },
      ...seats,
    ];
  }
);

setRows(formattedRows);
  };

  if (booking.show) load();
}, [booking.show]);
useEffect(() => {
  const auth = isLoggedIn();

  if (!auth) {
    router.replace("/login");
    return;
  }

  setLoggedIn(true);
  setChecked(true);
}, [router]);
  const toggleSeat = (seatKey: string) => {
    setSelected((prev) =>
      prev.includes(seatKey)
        ? prev.filter((s) => s !== seatKey)
        : [...prev, seatKey]
    );
  };
  const addSeatCallback = ({ row, number, id }: any, addCb: any) => {
    setSelected((prev) => [...prev, id]);
    addCb(row, number, id);
  };

  const removeSeatCallback = ({ row, number, id }: any, removeCb: any) => {
    setSelected((prev) => prev.filter((s) => s !== id));
    removeCb(row, number);
  };
 const continueNext = async () => {
  if (selected.length === 0) {
    alert("Select at least one seat");
    return;
  }

await api("/selected-seats/select", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    showId,
    seatKey: selected,
  }),
});

  setBooking((prev: any) => ({
    ...prev,
    seats: selected,
  }));

  router.push(`/book/terms/${showId}`);
};

  if (!layout) return <h2>Loading seats...</h2>;

  return (
    <div >
  <div className="seat-page">

    <h1 className="seat-title">Select Seats 🎟️</h1>

<div className="screen">SCREEN</div>

<SeatLegend />

<SeatLayout
  rows={rows}
  addSeatCallback={addSeatCallback}
  removeSeatCallback={removeSeatCallback}
/>

<SeatSummary selected={selected} />

<button className="continue-btn" onClick={continueNext}>
  Continue
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

      <div className="footer-bottom">
        BookMyShow
      </div>
    </footer>
    </div>
  );
}