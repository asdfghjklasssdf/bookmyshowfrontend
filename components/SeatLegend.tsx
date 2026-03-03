"use client";

export default function SeatLegend() {
  return (
    <div className="seat-legend">
      <div className="legend-item">
        <span className="legend-box available"></span>
        <span>Available</span>
      </div>

      <div className="legend-item">
        <span className="legend-box selected"></span>
        <span>Selected</span>
      </div>

      <div className="legend-item">
        <span className="legend-box booked"></span>
        <span>Booked</span>
      </div>

      <div className="legend-item">
        <span className="legend-box locked"></span>
        <span>Locked</span>
      </div>
    </div>
  );
}