/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/utils/api";

export const createBooking=(data:any)=>
  api("/bookings",{
    method:"POST",
    body: JSON.stringify(data),
  });


export const getMyBookings = () =>
  api("/bookings/my-bookings");
export const getBookings=()=>api("/bookings");