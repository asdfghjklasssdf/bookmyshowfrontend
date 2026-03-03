"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { BookingProvider } from "../app/context/BookingContext";
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbarRoutes = [
    "/login",
    "/signup",
    "/",
    "/forgot-password",
    "/verify-otp",
    "/dashboard",
  ];

  const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  return (
    <html lang="en">
      <body>
<BookingProvider>
  {!shouldHideNavbar && <Navbar />}
  {children}
</BookingProvider>
      </body>
    </html>
  );
}

// "use client";

// import "./globals.css";
// import Navbar from "../components/Navbar";
// import { usePathname } from "next/navigation";
// import { ReactNode } from "react";

// export default function RootLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const pathname = usePathname();

//   const hideNavbarRoutes = [
//     "/login",
//     "/signup",
//     "/",
//     "/forgot-password",
//     "/verify-otp",
//     "/dashboard",
//   ];

//   const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

//   return (
//     <html lang="en">
//       <body>
//         {!shouldHideNavbar && <Navbar />}
//         {children}
//       </body>
//     </html>
//   );
// }

