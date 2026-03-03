/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/utils/api";
export const createPayment=(data:any)=>
  api("/payments",{
    method:"POST",
    body:JSON.stringify(data),
  });

export const getPayments=()=>api("/payments");