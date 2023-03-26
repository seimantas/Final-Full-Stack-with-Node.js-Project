import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TAdmin } from "../RegisterAdmin/type";

export const AdminLogin = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const adminToLogin = {
      firstName,
      lastName,
      password,
    } as TAdmin;
   
axios
      .post("http://localhost:5000/login", adminToLogin)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/events");
       window.location.reload()
      })
      .catch((error) => {
        alert("Wrong credentials");
      });
  };

  return (
    <form onSubmit={handleLoginForm}>
      <h1>Administration Login</h1>
      <input
        onChange={(event) => setFirstName(event.target.value)}
        placeholder="First name"
        required
      />
      <input
        onChange={(event) => setLastName(event.target.value)}
        placeholder="Last name"
        required
      />
      <input
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Log in</button>
      <p>
        if you don't have an account, you can register here:{" "}
        <a href="/admin-registration">Register</a>
      </p>
    </form>
  );
};
