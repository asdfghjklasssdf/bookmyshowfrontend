/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  getScreens,
  createScreen,
  updateScreen,
  deleteScreen,
} from "@/services/screens";

import { getTheatres } from "@/services/theatres";

export default function ScreensPage() {

  const [screens,setScreens] = useState<any[]>([]);
  const [theatres,setTheatres] = useState<any[]>([]);
  const [editingId,setEditingId] = useState<string | null>(null);

  const [form,setForm] = useState({
    theatreId:"",
    screenNumber:"",
    screenType:"2D",
    totalSeats:""
  });

  useEffect(()=>{
    loadScreens();
    loadTheatres();
  },[]);

  const loadScreens = async ()=>{
    const data = await getScreens();
    setScreens(data);
  };

  const loadTheatres = async ()=>{
    const data = await getTheatres();
    setTheatres(data);
  };

  const handleChange = (e:any)=>{
    const {name,value} = e.target;

    setForm({
      ...form,
      [name]:value
    });
  };

  const handleSubmit = async ()=>{

    const payload = {
      theatreId: form.theatreId,
      screenNumber: Number(form.screenNumber),
      screenType: form.screenType,
      totalSeats: Number(form.totalSeats)
    };

    if(editingId){
      await updateScreen(editingId,payload);
    }else{
      await createScreen(payload);
    }

    setEditingId(null);

    setForm({
      theatreId:"",
      screenNumber:"",
      screenType:"2D",
      totalSeats:""
    });

    loadScreens();
  };

  const handleEdit = (screen:any)=>{

    setEditingId(screen._id);

    setForm({
      theatreId: screen.theatreId?._id || screen.theatreId,
      screenNumber: screen.screenNumber,
      screenType: screen.screenType,
      totalSeats: screen.totalSeats
    });
  };

  const handleDelete = async(id:string)=>{

    if(!confirm("Delete screen?")) return;

    await deleteScreen(id);
    loadScreens();
  };

  return (
    <div>

      <h1>🎬 Screen Manager</h1>


      <div className="admin-form">

        <div className="form-group">

          <label>Theatre</label>

          <select
            name="theatreId"
            value={form.theatreId}
            onChange={handleChange}
          >

            <option value="">Select Theatre</option>

            {theatres.map((t:any)=>(
              <option key={t._id} value={t._id}>
                {t.name} - {t.city}
              </option>
            ))}

          </select>

        </div>

        <div className="form-group">

          <label>Screen Number</label>

          <input
            name="screenNumber"
            value={form.screenNumber}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>Screen Type</label>

          <select
            name="screenType"
            value={form.screenType}
            onChange={handleChange}
          >

            <option value="2D">2D</option>
            <option value="3D">3D</option>
            <option value="IMAX">IMAX</option>
            <option value="4DX">4DX</option>

          </select>

        </div>

        <div className="form-group">

          <label>Total Seats</label>

          <input
            name="totalSeats"
            value={form.totalSeats}
            onChange={handleChange}
          />

        </div>

        <button onClick={handleSubmit}>
          {editingId ? "Update Screen" : "Create Screen"}
        </button>

      </div>

      <hr/>


      <div className="admin-list">

        {screens.map((screen:any)=>(

          <div key={screen._id} className="admin-card">

            <h3>
              Screen {screen.screenNumber}
            </h3>

            <p>
              🎭 Theatre: {screen.theatreId?.name}
            </p>

            <p>
              🎬 Type: {screen.screenType}
            </p>

            <p>
              💺 Seats: {screen.totalSeats}
            </p>

            <div className="card-actions">

              <button
                className="edit-btn"
                onClick={()=>handleEdit(screen)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={()=>handleDelete(screen._id)}
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