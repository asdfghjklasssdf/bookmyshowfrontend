"use client";

import Link from "next/link";
import "../../app/css/admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-container">

      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>

        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/movies">Movies</Link>
        <Link href="/admin/theatres">Theatres</Link>
        <Link href="/admin/screens">Screens</Link>
        <Link href="/admin/showtimings">Show Timings</Link>
        <Link href="/admin/bookings">Bookings</Link>

      </aside>

      <main className="admin-main">
        {children}
      </main>

    </div>
  );
}