/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/utils/api";

export const selectSeats=(data:any)=>
  api("/selected-seats/select",{
    method:"POST",
    body: JSON.stringify(data),
  });

export const releaseSeat=(seatId:string)=>
  api(`/selected-seats/${seatId}`,{
    method:"DELETE",
  });

export const getSelectedSeats=(showId:string)=>
  api(`/selected-seats/${showId}`);