/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  getTheatres,
  createTheatre,
  updateTheatre,
  deleteTheatre,
} from "@/services/theatres";

export default function AdminTheatres() {

  const [theatres,setTheatres] = useState<any[]>([]);
  const [editingId,setEditingId] = useState<string|null>(null);

  const [form,setForm] = useState({
    theatreId:"",
    name:"",
    location:"",
    city:"",
    totalScreens:""
  });

  const [image,setImage] = useState<File|null>(null);

  const loadTheatres = async ()=>{
    const data = await getTheatres();
    setTheatres(data);
  };

  useEffect(()=>{
    loadTheatres();
  },[]);

  const handleChange = (e:any)=>{
    const {name,value} = e.target;

    setForm({
      ...form,
      [name]:value
    });
  };

  const handleSubmit = async ()=>{

    const fd = new FormData();

    fd.append("theatreId",form.theatreId);
    fd.append("name",form.name);
    fd.append("location",form.location);
    fd.append("city",form.city);
    fd.append("totalScreens",form.totalScreens);

    if(image){
      fd.append("theatreImage",image);
    }

    if(editingId){
      await updateTheatre(editingId,fd);
    }else{
      await createTheatre(fd);
    }

    setForm({
      theatreId:"",
      name:"",
      location:"",
      city:"",
      totalScreens:""
    });

    setImage(null);
    setEditingId(null);

    loadTheatres();
  };

  const handleEdit = (theatre:any)=>{

    setEditingId(theatre._id);

    setForm({
      theatreId:theatre.theatreId || "",
      name:theatre.name || "",
      location:theatre.location || "",
      city:theatre.city || "",
      totalScreens:theatre.totalScreens || ""
    });
  };

  const handleDelete = async(id:string)=>{

    if(!confirm("Delete theatre?")) return;

    await deleteTheatre(id);
    loadTheatres();
  };

  return (
    <div>

      <h1>🎭 Admin Theatre Manager</h1>

      <div className="admin-form">

        <div className="form-group">
          <label>Theatre ID</label>
          <input
            name="theatreId"
            value={form.theatreId}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Theatre Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Total Screens</label>
          <input
            name="totalScreens"
            value={form.totalScreens}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Theatre Image</label>
          <input
            type="file"
            onChange={(e)=>setImage(e.target.files?.[0]||null)}
          />
        </div>

        <button onClick={handleSubmit}>
          {editingId ? "Update Theatre" : "Add Theatre"}
        </button>

      </div>

      <hr/>

      <div className="admin-list">

        {theatres.map((t:any)=>(
          <div key={t._id} className="admin-card">

            <img src={t.theatreImage} width="200"/>

            <h3>{t.name}</h3>

            <p>{t.location}, {t.city}</p>

            <p>🎬 Screens: {t.totalScreens}</p>

            <div className="card-actions">

              <button
                className="edit-btn"
                onClick={()=>handleEdit(t)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={()=>handleDelete(t._id)}
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}