/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/utils/api";

export const createScreen = (data:any)=>
  api("/screens",{
    method:"POST",
    body: JSON.stringify(data),
  });

export const getScreens = ()=> api("/screens");

export const getScreensByTheatre = (id:string)=>
  api(`/screens/theatre/${id}`);

export const updateScreen=(id:string,data:any)=>
  api(`/screens/${id}`,{
    method:"PATCH",
    body: JSON.stringify(data),
  });

export const deleteScreen=(id:string)=>
  api(`/screens/${id}`,{method:"DELETE"});