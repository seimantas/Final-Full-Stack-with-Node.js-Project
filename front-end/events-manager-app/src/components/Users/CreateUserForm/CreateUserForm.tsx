import axios from "axios";
import { FC, useState } from "react";
import { TCreateUserForm } from "../UsersList/type";
import { Modal, Box, Typography, TextField, Select, MenuItem, Button } from '@mui/material';




const EVENT_NAMES = [
  "Big Bnd concert",
  "The Jonny show",
  "Unbelievable Mike performance",
  "Mia concert",
  "Guess Who show",
  "Pot of Gold",
  "Live Talk",
];

export const CreateUserForm:FC<TCreateUserForm> = ({ isOpen, onClose, onCreateUser }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [eventName, setEventName] = useState("");

  const handleSubmit = (event:any) => {
    event.preventDefault();

    const newUser = {
      firstName,
      lastName,
      age,
      dateOfBirth,
      email,
      eventName,
    };

    
    axios
      .post("http://localhost:5000/users", newUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {     
        onCreateUser(response.data);
        onClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ width: 400, bgcolor: 'background.paper', p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Create New User
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            required
            label="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            label="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            label="Age"
            type="number"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
            margin="normal"
          />
          <Select
            required
            label="Event Name"
            value={eventName}
            onChange={(event) => setEventName(event.target.value)}
            fullWidth
            margin="dense"
          >
            <MenuItem value="">Select an event name...</MenuItem>
            {EVENT_NAMES.map((eventName) => (
              <MenuItem key={eventName} value={eventName}>
                {eventName}
              </MenuItem>
            ))}
          </Select>
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Create User
            </Button>
            <Button sx={{ ml: 1 }} onClick={onClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
