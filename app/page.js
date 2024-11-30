"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const addUser = async () => {
    if (!name.trim()) return;

    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setName("");
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">User List</h1>

      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="border p-2 mr-2"
        />
        <button onClick={addUser} className="bg-blue-500 text-white p-2">
          Add
        </button>
      </div>

      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex justify-between items-center mb-2">
            <span>{user.name}</span>
            <button
              onClick={() => deleteUser(user.id)}
              className="bg-red-500 text-white p-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
