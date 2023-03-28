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

export const EditUserForm: FC<TCreateUserForm> = ({
  onClose,
user
}) => {
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
        <h2>{user ? "Edit" : "Create New"} User</h2>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
          <label>
            Last Name:
            <input
              
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>
          <label>
            Age:
            <input
              
              type="number"
              value={age}
              onChange={(event) => setAge(Number(event.target.value))}
            />
          </label>
          <label>
            Date of Birth:
            <input
              
              type="date"
              value={dateOfBirth}
              onChange={(event) => setDateOfBirth(event.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            Event Name:
            <select value={eventName} onChange={(event) => setEventName(event.target.value)}>
              <option value="">Select an event</option>
              {EVENT_NAMES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">{user ? "Save Changes" : "Create User"}</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
