"use client";

interface SeatSummaryProps {
  selected: string[];
}

export default function SeatSummary({ selected }: SeatSummaryProps) {
  return (
    <div className="selected-info">
      <h3>🎟 Selected Seats</h3>
      <p>
        {selected.length > 0 ? selected.join(", ") : "No seats selected"}
      </p>
    </div>
  );
}