/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = "http://localhost:4000/movies";

export async function getMovies() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  return res.json();
}

export async function getMovieById(id: string) {
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch movie");
  }

  return res.json();
}

export async function createMovie(
  movieData: any,
  file?: File,
) {
  const formData = new FormData();


  Object.keys(movieData).forEach((key) => {
    if (movieData[key] !== undefined) {
      formData.append(key, movieData[key]);
    }
  });

  if (file) {
    formData.append("file", file);
  }

  const res = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create movie");
  }

  return res.json();
}


export async function updateMovie(id: string, data: any) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update movie");
  }

  return res.json();
}


export async function deleteMovie(id: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete movie");
  }

  return res.json();
}