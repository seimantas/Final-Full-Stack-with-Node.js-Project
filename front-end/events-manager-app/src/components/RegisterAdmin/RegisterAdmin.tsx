import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterAdmin = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const navigate = useNavigate();
    

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (firstName.trim() === "" && lastName.trim() === "") {
            alert("Please enter your first and last name.");
            return;
          }
      
          if (password.length < 8) {
            alert("Password must be at least 8 characters.");
            return;
          }
      
          if (password !== repeatPassword) {
            alert("Passwords do not match.");
            return;
          }

const newAdmin = {
    firstName: firstName,
    lastName: lastName,
    password: password,}

    axios.post("http://localhost:5000/registration", newAdmin)
    .then((response) => {
       if(!response) {
            return alert("Something went wrong. Please try again later.")}
     navigate("/");         
            })
    .catch((error) => {
        alert("Something went wrong. Please try again later.")
    })}

    return (
        <form onSubmit={handleSubmit}>
            <h1>Administrator Registration</h1>
            
            <input onChange={(event) => setFirstName(event.target.value)} placeholder="First Name" />
            
            <input  onChange={(event) => setLastName(event.target.value)} placeholder="Last Name" />
           
            <input type="password" onChange={(event) => setPassword(event.target.value)}  placeholder="Password" />
           
            <input type="password" onChange={(event) => setRepeatPassword(event.target.value)} placeholder="Repeat password" />
           
           <button type="submit">Submit</button>
        </form>    )
} 