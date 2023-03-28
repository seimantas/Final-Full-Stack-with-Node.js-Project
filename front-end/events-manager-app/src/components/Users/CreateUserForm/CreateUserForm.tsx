import axios from "axios";
import { FC, useState } from "react";
import { TCreateUserForm } from "../../UsersList/type";




const EVENT_NAMES = [
  "Big Bnd concert",
  "The Jonny show",
  "Unbelievable Mike performance",
  "Mia concert",
  "Guess Who show",
  "Pot of Gold",
  "Live Talk",
];

export const CreateUserForm:FC<TCreateUserForm> = ({ onClose, onCreateUser }) => {
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
    <div className="modal">
      <div className="modal-content">
        <h2>Create New User</h2>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input required
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
          <label>
            Last Name:
            <input required
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>
          <label>
            Age:
            <input required
              type="number"
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
          </label>
          <label>
            Date of Birth:
            <input required
              type="date"
              value={dateOfBirth}
              onChange={(event) => setDateOfBirth(event.target.value)}
            />
          </label>
          <label>
            Email:
            <input required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            Event Name:
            <select required
              value={eventName}
              onChange={(event) => setEventName(event.target.value)}
            >
              <option value="">Select an event name...</option>
              {EVENT_NAMES.map((eventName) => (
                <option key={eventName} value={eventName}>
                  {eventName}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Create User</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};