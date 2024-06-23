'use client'

import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async () => {
      const req_body ={
        email: email,
        password: password
      }

      const response = await fetch('http://localhost:8080/api/user/login', {
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
      var token = fetched.token


      if (token != null) {
        window.localStorage.setItem("token", token);

        console.log(token)

        const userResponse = await fetch('http://localhost:8080/api/users', {
          method: 'GET',
          mode: 'cors', // no-cors, *cors, same-origin
          headers: {
            'token': `${token}`
          },
        });

        const fetchedUser = await userResponse.json()
        console.log(fetchedUser)

        window.localStorage.setItem("userId", fetchedUser.id);
        console.log(fetchedUser.id)

        window.location.replace("http://localhost:3000/playground");
      }
     
    };
  
    return (
      <div className={"flex flex-col items-center justify-center h-full"}>
        <div className={"bg-black/25 m-8 p-8"}>
        <div className={"font-semibold text-white text-3xl my-8"}>Login</div>
        <div className={"w-full max-w-md"}>
          <div>
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
              <button onClick={handleSubmit} className={"bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"}>
                Login
              </button>
  
              <a href="/register" className={"text-blue-500 hover:text-blue-700 my-8 mx-8"}>
                Don't have an account? Register here
              </a>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }