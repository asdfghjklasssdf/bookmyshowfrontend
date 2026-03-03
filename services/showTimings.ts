/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/utils/api";

export const createShow = (data:any)=>
  api("/show-timings",{
    method:"POST",
    body: JSON.stringify(data),
  });

export const getShows = ()=>api("/show-timings");

export const getShowsByMovie = (id:string)=>
  api(`/show-timings/movie/${id}`);

export const getShowsByTheatre = (id:string)=>
  api(`/show-timings/theatre/${id}`);

export const getShowsByScreen = (id:string)=>
  api(`/show-timings/screen/${id}`);