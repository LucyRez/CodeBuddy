'use client'

import { useState } from "react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async () => {

      const response = await fetch('http://localhost:8080/api/user/register', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const fetched = await response.json()

      if (response.ok) {
        window.location.replace("http://localhost:3000/login");
      }
     
    };
  
    return (
      <div className={"flex flex-col items-center justify-center h-full"}>
        <div className={"bg-black/25 m-8 p-8"}>
        <div className={"font-semibold text-white text-3xl my-8"}>Create New Account</div>
        <div className={"w-full max-w-md"}>
          <form onSubmit={handleSubmit}>
            <div className={"mb-6"}>
              <label htmlFor="email" className={"font-semibold text-white block mb-2"}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={"w-full p-2 border border-gray-300 rounded"}
              />
            </div>
  
            <div className={"mb-6"}>
              <label htmlFor="password" className={"font-semibold text-white block mb-2"}>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={"w-full p-2 border border-gray-300 rounded"}
              />
            </div>
  
            <div className={"flex items-center justify-between"}>
              <button type="submit" className={"bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"}>
                Register
              </button>
  
              <a href="/login" className={"text-blue-500 hover:text-blue-700 my-8 mx-8"}>
                Already have an account? Login here
              </a>
            </div>
          </form>
        </div>
        </div>
      </div>
    );
  }