/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { getMovies, deleteMovie } from "@/services/movies";

export default function AdminMovies() {

  const [movies, setMovies] = useState<any[]>([]);

  const [form, setForm] = useState<any>({
    movieId: "",
    name: "",
    duration: "",
    rating: "",
    genres: "",
    language: "",
    description: "",
    votes: "",
    tags: "",
    isNowShowing: false
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const [poster,setPoster]=useState<File|null>(null);
  const [banner,setBanner]=useState<File|null>(null);
  const [trailer,setTrailer]=useState<File|null>(null);
  const [castImages,setCastImages]=useState<File|null>(null);

  type Cast = { name: string; role: string };
  type Crew = { name: string; role: string };

  const [castList, setCastList] = useState<Cast[]>([
    { name: "", role: "" }
  ]);

  const [crewList, setCrewList] = useState<Crew[]>([
    { name: "", role: "" }
  ]);

  const loadMovies = async () => {
    const data = await getMovies();
    setMovies(data);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleChange = (e:any) => {

    const {name,value,type,checked} = e.target;

    setForm({
      ...form,
      [name]: type==="checkbox" ? checked : value
    });

  };

  const handleSubmit = async () => {

    const fd = new FormData();

    fd.append("movieId",form.movieId);
    fd.append("name",form.name);
    fd.append("duration",form.duration);
    fd.append("rating",form.rating);
    fd.append("description",form.description);
    fd.append("votes",form.votes);

    fd.append("genres",JSON.stringify(form.genres.split(",")));
    fd.append("language",JSON.stringify(form.language.split(",")));
    fd.append("tags",JSON.stringify(form.tags.split(",")));

    fd.append("isNowShowing",String(form.isNowShowing));

    fd.append("cast", JSON.stringify(castList));
    fd.append("crew", JSON.stringify(crewList));

    if(poster) fd.append("poster",poster);
    if(banner) fd.append("banner",banner);
    if(trailer) fd.append("trailer",trailer);
    if(castImages) fd.append("castImages",castImages);

    const url = editingId
      ? `http://localhost:4000/movies/${editingId}`
      : "http://localhost:4000/movies";

    const method = editingId ? "PATCH" : "POST";

    await fetch(url,{method,body:fd});

    setEditingId(null);

    loadMovies();
  };

  const handleDelete = async (id:string) => {

    if(!confirm("Delete movie?")) return;

    await deleteMovie(id);
    loadMovies();

  };

  const addCast = () => {
    setCastList([...castList,{name:"",role:""}]);
  };

  const removeCast = (index:number)=>{
    const updated=[...castList];
    updated.splice(index,1);
    setCastList(updated);
  };

  const handleCastChange=(index:number,field:"name"|"role",value:string)=>{
    const updated=[...castList];
    updated[index][field]=value;
    setCastList(updated);
  };

  const addCrew = () => {
    setCrewList([...crewList,{name:"",role:""}]);
  };

  const removeCrew = (index:number)=>{
    const updated=[...crewList];
    updated.splice(index,1);
    setCrewList(updated);
  };

  const handleCrewChange=(index:number,field:"name"|"role",value:string)=>{
    const updated=[...crewList];
    updated[index][field]=value;
    setCrewList(updated);
  };

  const handleEdit = (movie:any)=>{

    setEditingId(movie._id);

    setForm({
      movieId: movie.movieId || "",
      name: movie.name || "",
      duration: movie.duration || "",
      rating: movie.rating || "",
      genres: movie.genres?.join(",") || "",
      language: movie.language?.join(",") || "",
      description: movie.description || "",
      votes: movie.votes || "",
      tags: movie.tags?.join(",") || "",
      isNowShowing: movie.isNowShowing || false
    });

    setCastList(movie.cast || [{name:"",role:""}]);
    setCrewList(movie.crew || [{name:"",role:""}]);

  };

  return (
    <div>

      <h1>🎬 Admin Movie Manager</h1>

      <div className="admin-form">

        <div className="form-group">
          <label>Movie ID</label>
          <input name="movieId" value={form.movieId} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>Movie Name</label>
          <input name="name" value={form.name} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>Duration</label>
          <input name="duration" value={form.duration} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>Rating</label>
          <input name="rating" value={form.rating} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>Votes</label>
          <input name="votes" value={form.votes} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>Genres</label>
          <input name="genres" value={form.genres} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>Language</label>
          <input name="language" value={form.language} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>Tags</label>
          <input name="tags" value={form.tags} onChange={handleChange}/>
        </div>

        <div className="form-group full">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange}/>
        </div>

        <div className="form-group full">
          <label>Cast</label>

          {castList.map((cast,index)=>(
            <div key={index} className="cast-row">

              <input
                value={cast.name}
                placeholder="Actor Name"
                onChange={(e)=>handleCastChange(index,"name",e.target.value)}
              />

              <input
                value={cast.role}
                placeholder="Role"
                onChange={(e)=>handleCastChange(index,"role",e.target.value)}
              />

              <button type="button" onClick={()=>removeCast(index)}>➖</button>

            </div>
          ))}

          <button type="button" onClick={addCast}>➕ Add Cast</button>
        </div>

        <div className="form-group full">
          <label>Crew</label>

          {crewList.map((crew,index)=>(
            <div key={index} className="cast-row">

              <input
                value={crew.name}
                placeholder="Crew Name"
                onChange={(e)=>handleCrewChange(index,"name",e.target.value)}
              />

              <input
                value={crew.role}
                placeholder="Role"
                onChange={(e)=>handleCrewChange(index,"role",e.target.value)}
              />

              <button type="button" onClick={()=>removeCrew(index)}>➖</button>

            </div>
          ))}

          <button type="button" onClick={addCrew}>➕ Add Crew</button>
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="isNowShowing"
              checked={form.isNowShowing}
              onChange={handleChange}
            />
            Now Showing
          </label>
        </div>

        <div className="form-group full">
          <label>Poster</label>
          <input type="file" onChange={(e)=>setPoster(e.target.files?.[0]||null)}/>
        </div>

        <div className="form-group full">
          <label>Banner</label>
          <input type="file" onChange={(e)=>setBanner(e.target.files?.[0]||null)}/>
        </div>

        <div className="form-group full">
          <label>Trailer</label>
          <input type="file" onChange={(e)=>setTrailer(e.target.files?.[0]||null)}/>
        </div>

        <div className="form-group full">
          <label>Cast Images</label>
          <input type="file" onChange={(e)=>setCastImages(e.target.files?.[0]||null)}/>
        </div>

        <button onClick={handleSubmit}>
          {editingId ? "Update Movie" : "Add Movie"}
        </button>

      </div>

      <hr/>

      <div className="admin-list">

        {movies.map((movie:any)=>(
          <div key={movie._id} className="admin-card">

            <img src={movie.posterUrl} width="120"/>

            <h3>{movie.name}</h3>

            <p>{movie.duration}</p>

            <p>⭐ {movie.rating}</p>

            <div className="card-actions">

              <button onClick={()=>handleEdit(movie)} className="edit-btn">
                Edit
              </button>

              <button onClick={()=>handleDelete(movie._id)} className="delete-btn">
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}