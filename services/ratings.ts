/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/utils/api";

export const rateMovie = (data:any)=>
  api("/ratings",{
    method:"POST",
    body: JSON.stringify(data),
  });

export const getRatings = (movieId:string)=>
  api(`/ratings/${movieId}`);

export const getRatingStats = (movieId:string)=>
  api(`/ratings/stats/${movieId}`);