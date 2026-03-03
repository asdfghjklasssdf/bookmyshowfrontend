import { api } from "@/utils/api";

export const getTheatres = () => api("/theatres");

export const getTheatre = (id:string)=>
  api(`/theatres/${id}`);

export const createTheatre = (formData:FormData)=>
  api("/theatres",{
    method:"POST",
    body: formData,
  });

export const updateTheatre = (id:string,formData:FormData)=>
  api(`/theatres/${id}`,{
    method:"PATCH",
    body: formData,
  });

export const deleteTheatre=(id:string)=>
  api(`/theatres/${id}`,{method:"DELETE"});