/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { getMovies } from "@/services/movies";
import { getTheatres } from "@/services/theatres";
import { getScreens } from "@/services/screens";
import { getBookings } from "@/services/bookings";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
ResponsiveContainer,
LineChart,
Line
} from "recharts";

export default function AdminAnalytics(){

const [movies,setMovies] = useState<any[]>([]);
const [theatres,setTheatres] = useState<any[]>([]);
const [screens,setScreens] = useState<any[]>([]);
const [bookings,setBookings] = useState<any[]>([]);

const [revenue,setRevenue] = useState(0);
const [tickets,setTickets] = useState(0);

const [movieChart,setMovieChart] = useState<any[]>([]);
const [dailyRevenue,setDailyRevenue] = useState<any[]>([]);
const [peakChart,setPeakChart] = useState<any[]>([]);

const [topMovies,setTopMovies] = useState<any[]>([]);
const [recentBookings,setRecentBookings] = useState<any[]>([]);
const [theatrePerformance,setTheatrePerformance] = useState<any[]>([]);

const loadData = async()=>{

const movieData = await getMovies();
const theatreData = await getTheatres();
const screenData = await getScreens();
const bookingData = await getBookings();

setMovies(movieData);
setTheatres(theatreData);
setScreens(screenData);
setBookings(bookingData);



const totalRevenue = bookingData.reduce(
(sum:any,b:any)=> sum + b.totalAmount,
0
);

setRevenue(totalRevenue);



const totalTickets = bookingData.reduce(
(sum:any,b:any)=> sum + b.seats.length,
0
);

setTickets(totalTickets);



const movieStats:any = {};

bookingData.forEach((b:any)=>{

const movie = b.showTimingId?.movieId?.name || "Unknown";

if(!movieStats[movie]){
movieStats[movie]={
movie,
bookings:0,
revenue:0
};
}

movieStats[movie].bookings +=1;
movieStats[movie].revenue += b.totalAmount;

});

const movieArray = Object.values(movieStats);

setMovieChart(movieArray);



const top = [...movieArray]
.sort((a:any,b:any)=>b.bookings-a.bookings)
.slice(0,5);

setTopMovies(top);



const revenueByDay:any={};

bookingData.forEach((b:any)=>{

const day = new Date(b.createdAt)
.toISOString()
.split("T")[0];

if(!revenueByDay[day]){
revenueByDay[day]={day,revenue:0}
}

revenueByDay[day].revenue+=b.totalAmount;

});

setDailyRevenue(Object.values(revenueByDay));



const hourStats:any={};

bookingData.forEach((b:any)=>{

const hour = new Date(b.createdAt).getHours();

if(!hourStats[hour]){
hourStats[hour]={hour,bookings:0}
}

hourStats[hour].bookings++;

});

setPeakChart(Object.values(hourStats));



const theatreStats:any={};

bookingData.forEach((b:any)=>{

const theatre = b.showTimingId?.theatreId?.name || "Unknown";

if(!theatreStats[theatre]){
theatreStats[theatre]={theatre,bookings:0};
}

theatreStats[theatre].bookings++;

});

setTheatrePerformance(Object.values(theatreStats));



const recent=[...bookingData]
.sort(
(a:any,b:any)=>
new Date(b.createdAt).getTime()
-
new Date(a.createdAt).getTime()
)
.slice(0,5);

setRecentBookings(recent);

};

useEffect(()=>{
loadData();
},[]);

return(

<div className="analytics-container">

<h1 className="title">📊 Admin Analytics</h1>


<div className="grid">

<div className="card">
<h3>🎬 Movies</h3>
<p>{movies.length}</p>
</div>

<div className="card">
<h3>🏢 Theatres</h3>
<p>{theatres.length}</p>
</div>

<div className="card">
<h3>🎥 Screens</h3>
<p>{screens.length}</p>
</div>

<div className="card">
<h3>🎟 Bookings</h3>
<p>{bookings.length}</p>
</div>

<div className="card revenue">
<h3>💰 Revenue</h3>
<p>₹ {revenue}</p>
</div>

<div className="card">
<h3>🎫 Tickets Sold</h3>
<p>{tickets}</p>
</div>

</div>


<h2>Bookings Per Movie</h2>

<ResponsiveContainer width="100%" height={300}>
<BarChart data={movieChart}>
<CartesianGrid strokeDasharray="3 3"/>
<XAxis dataKey="movie"/>
<YAxis/>
<Tooltip/>
<Bar dataKey="bookings"/>
</BarChart>
</ResponsiveContainer>


<h2>Daily Revenue</h2>

<ResponsiveContainer width="100%" height={300}>
<LineChart data={dailyRevenue}>
<CartesianGrid strokeDasharray="3 3"/>
<XAxis dataKey="day"/>
<YAxis/>
<Tooltip/>
<Line dataKey="revenue"/>
</LineChart>
</ResponsiveContainer>


<h2>Peak Booking Time</h2>

<ResponsiveContainer width="100%" height={300}>
<BarChart data={peakChart}>
<CartesianGrid strokeDasharray="3 3"/>
<XAxis dataKey="hour"/>
<YAxis/>
<Tooltip/>
<Bar dataKey="bookings"/>
</BarChart>
</ResponsiveContainer>


<h2>🔥 Top Movies</h2>

<ul>

{topMovies.map((m:any)=>(
<li key={m.movie}>
{m.movie} — {m.bookings} bookings
</li>
))}

</ul>


<h2>🕒 Recent Bookings</h2>

<div>

{recentBookings.map((b:any)=>(
<div key={b._id} className="recent">

<p>
🎬 {b.showTimingId?.movieId?.name}
</p>

<p>
Seats: {b.seats.join(",")}
</p>

<p>
₹{b.totalAmount}
</p>

</div>
))}

</div>


<h2>🏢 Theatre Performance</h2>

<ul>

{theatrePerformance.map((t:any)=>(
<li key={t.theatre}>
{t.theatre} — {t.bookings} bookings
</li>
))}

</ul>

</div>

);

}