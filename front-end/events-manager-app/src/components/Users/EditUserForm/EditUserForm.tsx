import axios from "axios";
import { FC, useContext, useState } from "react";
import { TCreateUserForm } from "../UsersList/type";
import { Button, FormControl, FormLabel, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { EventContext } from "../../EventConext";



export const EditUserForm: FC<TCreateUserForm> = ({
  onClose,
  user
}) => {
  const EVENT_NAMES =useContext(EventContext)
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [age, setAge] = useState(user?.age || 0);
    const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || "");
    const [email, setEmail] = useState(user?.email || "");
    const [eventName, setEventName] = useState(user?.eventName || "");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const editedUser = {
      firstName,
      lastName,
      age,
      dateOfBirth,
      email,
      eventName,
    };

    axios
      .post(`http://localhost:5000/users/${user?._id}`, editedUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        
        onClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <Typography variant="h4">{user ? "Edit" : "Create New"} User</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Age"
            type="number"
            value={age}
            onChange={(event) => setAge(Number(event.target.value))}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <FormControl variant="outlined" margin="normal" fullWidth>
            <InputLabel>Event Name</InputLabel>
            <Select value={eventName} onChange={(event) => setEventName(event.target.value)}>
              <MenuItem value="">Select an event</MenuItem>
              {EVENT_NAMES.eventName.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">{user ? "Save Changes" : "Create User"}</Button>
          <Button type="button" onClick={onClose} variant="outlined" color="secondary" sx={{ ml: 1 }}>Cancel</Button>
        </form>
      </div>
    </div>
  );
};
