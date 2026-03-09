"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/utils/auth";
export default function AdminDashboard() {
    const router = useRouter();

  useEffect(() => {
    if (!isAdmin()) {
      router.push("/");
    }
  }, []);
  return (
    <div>

      <h1>Admin Dashboard</h1>

      <div className="admin-grid">

        <div className="admin-card">
          Movies
        </div>

        <div className="admin-card">
          Theatres
        </div>

        <div className="admin-card">
          Screens
        </div>

        <div className="admin-card">
          Show Timings
        </div>

        <div className="admin-card">
          Bookings
        </div>

      </div>

    </div>
  );
}