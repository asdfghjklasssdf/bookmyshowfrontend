/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";

export default function AdminUsers() {

  const [users,setUsers] = useState<any[]>([]);

  const loadUsers = async ()=>{

    const data = await api("/users");
    setUsers(data);

  };

  useEffect(()=>{
    loadUsers();
  },[]);

  const changeRole = async (userId:string,role:string)=>{

    await api(`/users/${userId}`,{
      method:"PATCH",
      body:JSON.stringify({ role })
    });

    loadUsers();

  };

  return (
    <div>

      <h1>👥 User Manager</h1>

      <div className="admin-list">

        {users.map((u:any)=>(

          <div key={u._id} className="admin-card">

            <h3>{u.fullName}</h3>

            <p>📧 {u.email}</p>

            <p>👤 @{u.username}</p>

            <p>
              Role: 
              <strong> {u.role}</strong>
            </p>

            <div className="card-actions">

              {u.role === "user" && (

                <button
                  className="edit-btn"
                  onClick={()=>changeRole(u._id,"admin")}
                >
                  Promote to Admin
                </button>

              )}

              {u.role === "admin" && (

                <button
                  className="delete-btn"
                  onClick={()=>changeRole(u._id,"user")}
                >
                  Remove Admin
                </button>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}