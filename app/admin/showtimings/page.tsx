/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  createShow,
  getShows,
} from "@/services/showTimings";

import { getMovies } from "@/services/movies";
import { getTheatres } from "@/services/theatres";
import { getScreensByTheatre } from "@/services/screens";

export default function ShowTimingsPage() {

  const [shows,setShows] = useState<any[]>([]);
  const [movies,setMovies] = useState<any[]>([]);
  const [theatres,setTheatres] = useState<any[]>([]);
  const [screens,setScreens] = useState<any[]>([]);
  const [editingId,setEditingId] = useState<string|null>(null);

  const [form,setForm] = useState({
    movieId:"",
    theatreId:"",
    screenId:"",
    showDate:"",
    startTime:"",
    endTime:"",
    price:""
  });

  useEffect(()=>{
    loadShows();
    loadMovies();
    loadTheatres();
  },[]);

  const loadShows = async ()=>{
    const data = await getShows();
    setShows(data);
  };

  const loadMovies = async ()=>{
    const data = await getMovies();
    setMovies(data);
  };

  const loadTheatres = async ()=>{
    const data = await getTheatres();
    setTheatres(data);
  };

  const loadScreens = async(theatreId:string)=>{
    const data = await getScreensByTheatre(theatreId);
    setScreens(data);
  };

  const handleChange = (e:any)=>{

    const {name,value} = e.target;

    if(name==="theatreId"){
      loadScreens(value);
    }

    setForm({
      ...form,
      [name]:value
    });

  };

  const handleSubmit = async()=>{

    const payload = {
      movieId: form.movieId,
      theatreId: form.theatreId,
      screenId: form.screenId,
      showDate: form.showDate,
      startTime: form.startTime,
      endTime: form.endTime,
      price: Number(form.price)
    };

    if(editingId){
      await fetch(
        `http://localhost:4000/show-timings/${editingId}`,
        {
          method:"PATCH",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(payload)
        }
      );
    }else{
      await createShow(payload);
    }

    setEditingId(null);

    setForm({
      movieId:"",
      theatreId:"",
      screenId:"",
      showDate:"",
      startTime:"",
      endTime:"",
      price:""
    });

    loadShows();
  };

  const handleEdit = (show:any)=>{

    setEditingId(show._id);

    setForm({
      movieId: show.movieId?._id,
      theatreId: show.theatreId?._id,
      screenId: show.screenId?._id,
      showDate: show.showDate?.slice(0,10),
      startTime: show.startTime,
      endTime: show.endTime,
      price: show.price
    });

    loadScreens(show.theatreId?._id);
  };

  const handleDelete = async(id:string)=>{

    if(!confirm("Delete show?")) return;

    await fetch(
      `http://localhost:4000/show-timings/${id}`,
      {method:"DELETE"}
    );

    loadShows();
  };

  return (
    <div>

      <h1>🎟 Show Timings Manager</h1>

      <div className="admin-form">


        <div className="form-group">

          <label>Movie</label>

          <select
            name="movieId"
            value={form.movieId}
            onChange={handleChange}
          >

            <option value="">
              Select Movie
            </option>

            {movies.map((m:any)=>(
              <option key={m._id} value={m._id}>
                {m.name}
              </option>
            ))}

          </select>

        </div>



        <div className="form-group">

          <label>Theatre</label>

          <select
            name="theatreId"
            value={form.theatreId}
            onChange={handleChange}
          >

            <option value="">
              Select Theatre
            </option>

            {theatres.map((t:any)=>(
              <option key={t._id} value={t._id}>
                {t.name} - {t.city}
              </option>
            ))}

          </select>

        </div>



        <div className="form-group">

          <label>Screen</label>

          <select
            name="screenId"
            value={form.screenId}
            onChange={handleChange}
          >

            <option value="">
              Select Screen
            </option>

            {screens.map((s:any)=>(
              <option key={s._id} value={s._id}>
                Screen {s.screenNumber} ({s.screenType})
              </option>
            ))}

          </select>

        </div>



        <div className="form-group">

          <label>Date</label>

          <input
            type="date"
            name="showDate"
            value={form.showDate}
            onChange={handleChange}
          />

        </div>



        <div className="form-group">

          <label>Start Time</label>

          <input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>End Time</label>

          <input
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
          />

        </div>



        <div className="form-group">

          <label>Ticket Price</label>

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
          />

        </div>

        <button onClick={handleSubmit}>
          {editingId ? "Update Show" : "Create Show"}
        </button>

      </div>


      <hr/>



      <div className="admin-list">

        {shows.map((show:any)=>(
          <div key={show._id} className="admin-card">

            <h3>{show.movieId?.name}</h3>

            <p>
              {show.theatreId?.name} - Screen {show.screenId?.screenNumber}
            </p>

            <p>
              📅 {new Date(show.showDate).toDateString()}
            </p>

            <p>
              ⏰ {show.startTime} - {show.endTime}
            </p>

            <p>
              🎟 ₹{show.price}
            </p>

            <div className="card-actions">

              <button
                className="edit-btn"
                onClick={()=>handleEdit(show)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={()=>handleDelete(show._id)}
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