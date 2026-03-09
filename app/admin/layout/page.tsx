/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { getScreens } from "@/services/screens";
import SeatPicker from "react-seat-picker";

export default function AdminLayout() {

const [screens,setScreens] = useState<any[]>([]);
const [screenId,setScreenId] = useState("");
const [rows,setRows] = useState(10);
const [seatsPerRow,setSeatsPerRow] = useState(15);

const [layout,setLayout] = useState<any>(null);
const [seatRows,setSeatRows] = useState<any[]>([]);

useEffect(()=>{

const loadScreens = async ()=>{
  const data = await getScreens();
  setScreens(data);
};

loadScreens();

},[]);

const createLayout = async ()=>{

await api("/screen-layout",{
  method:"POST",
  body: JSON.stringify({
    screenId,
    rows,
    seatsPerRow
  })
});

alert("Layout created");

};

const loadLayout = async ()=>{

const data = await api(`/screen-layout/${screenId}`);
setLayout(data);

buildRows(data);

};

const buildRows = (layoutData:any)=>{

const grouped: Record<string, any[]> = {};

layoutData.seats.forEach((seat:any)=>{

const row = seat.row;

if(!grouped[row]) grouped[row] = [];

const seatNumber = seat.number;

if(seatNumber === 6 || seatNumber === 11){

grouped[row].push({
id:`gap-${row}-${seatNumber}`,
number:"",
isReserved:true,
isGap:true
});

}

grouped[row].push({
id:seat.seatKey,
number:seat.number,
isSelected:false,
isReserved:false,
tooltip:seat.type
});

});

const formattedRows = Object.entries(grouped).map(
([rowLabel,seats])=>[
{
id:`${rowLabel}-label`,
number:rowLabel,
isReserved:true
},
...seats
]
);

setSeatRows(formattedRows);

};

const changeSeatType = async (seatKey:string)=>{

const seat = layout.seats.find(
(s:any)=>s.seatKey === seatKey
);

let newType = "Silver";

if(seat.type === "Silver") newType = "Gold";
else if(seat.type === "Gold") newType = "Platinum";

await api(`/screen-layout/${screenId}/${seatKey}`,{
method:"PATCH",
body: JSON.stringify({ type:newType })
});

loadLayout();

};

const addSeatCallback = ({ id }:any, addCb:any)=>{
changeSeatType(id);
addCb();
};

const removeSeatCallback = ()=>{};

const deleteLayout = async ()=>{

if(!confirm("Delete layout?")) return;

await api(`/screen-layout/${screenId}`,{
method:"DELETE"
});

setLayout(null);
setSeatRows([]);

};

return(

<div>

<h1>🎟 Screen Layout Manager</h1>

<div className="admin-form">

<label>Screen</label>

<select
value={screenId}
onChange={(e)=>setScreenId(e.target.value)}
>

<option>Select Screen</option>

{screens.map((s:any)=>(
<option key={s._id} value={s._id}>
Screen {s.screenNumber}
</option>
))}

</select>

<label>Rows</label>

<input
type="number"
value={rows}
onChange={(e)=>setRows(Number(e.target.value))}
/>

<label>Seats Per Row</label>

<input
type="number"
value={seatsPerRow}
onChange={(e)=>setSeatsPerRow(Number(e.target.value))}
/>

<button onClick={createLayout}>
Generate Layout
</button>

<button onClick={loadLayout}>
Load Layout
</button>

<button onClick={deleteLayout}>
Delete Layout
</button>

</div>

{layout && (

<div className="theatre-container">

<div className="screen">SCREEN</div>

<SeatPicker
rows={seatRows}
addSeatCallback={addSeatCallback}
removeSeatCallback={removeSeatCallback}
maxReservableSeats={1}
alpha
/>

</div>

)}

</div>

);

}