/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SeatPicker from "react-seat-picker";

interface SeatLayoutProps {
  rows: any[];
  addSeatCallback: any;
  removeSeatCallback: any;
}

export default function SeatLayout({
  rows,
  addSeatCallback,
  removeSeatCallback,
}: SeatLayoutProps) {
return (
  <div className="theatre-container">
    <div className="seat-picker-wrapper">
<SeatPicker
  rows={rows}
  addSeatCallback={addSeatCallback}
  removeSeatCallback={removeSeatCallback}
  maxReservableSeats={6}
  alpha
  seatStyle={(seat: any) =>
    seat.isGap ? "gap-seat" : ""
  }
/>
    </div>
  </div>
);
}