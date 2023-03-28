import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";

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
      password: password,
    };

    axios
      .post("http://localhost:5000/registration", newAdmin)
      .then((response) => {
        if (!response) {
          return alert("Something went wrong. Please try again later.");
        }
        navigate("/");
      })
      .catch((error) => {
        alert("Something went wrong. Please try again later.");
      });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", maxWidth: 400, margin: "auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Administrator Registration
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          margin="normal"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Last Name"
          margin="normal"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
          fullWidth
        />
        <TextField
          type="password"
          label="Password"
          margin="normal"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          fullWidth
        />
        <TextField
          type="password"
          label="Repeat Password"
          margin="normal"
          value={repeatPassword}
          onChange={(event) => setRepeatPassword(event.target.value)}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};