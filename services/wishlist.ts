import { api } from "@/utils/api";

export const getWishlist = () => api("/wishlist");

export const addWishlist = (movieId:string)=>
  api(`/wishlist/${movieId}`,{method:"POST"});

export const removeWishlist = (movieId:string)=>
  api(`/wishlist/${movieId}`,{method:"DELETE"});