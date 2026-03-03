/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/utils/api";
export const createLayout=(data:any)=>
  api("/screen-layout",{
    method:"POST",
    body: JSON.stringify(data),
  });

export const getLayout=(screenId:string)=>
  api(`/screen-layout/${screenId}`);

export const updateSeatType=(
  screenId:string,
  seatKey:string,
  type:string
)=>
  api(`/screen-layout/${screenId}/${seatKey}`,{
    method:"PATCH",
    body: JSON.stringify({type}),
  });