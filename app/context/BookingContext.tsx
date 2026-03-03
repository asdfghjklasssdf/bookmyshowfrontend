/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useState } from "react";

interface BookingState {
  movie: any;
  show: any;
  seats: string[];
  food: any[];
  contact: any;
  payment: any;
}

const BookingContext = createContext<any>(null);

export const BookingProvider = ({ children }: any) => {
  const [booking, setBooking] = useState<BookingState>({
    movie: null,
    show: null,
    seats: [],
    food: [],
    contact: null,
    payment: null,
  });

  return (
    <BookingContext.Provider value={{ booking, setBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);