import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { TAdmin } from "../RegisterAdmin/type";

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  gap: "1rem",
});

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
        window.location.reload();
      })
      .catch((error) => {
        alert("Wrong credentials");
      });
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "480px", mx: "auto" }}>
      <FormContainer onSubmit={handleLoginForm}>
        <Typography variant="h5">Administration Login</Typography>
        <TextField
          label="First name"
          variant="outlined"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
        />
        <TextField
          label="Last name"
          variant="outlined"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <Button variant="contained" type="submit">
          Log in
        </Button>
        <Typography>
          If you don't have an account, you can register here:{" "}
          <a href="/admin-registration">Register</a>
        </Typography>
      </FormContainer>
    </Box>
  );
};

export default AdminLogin;