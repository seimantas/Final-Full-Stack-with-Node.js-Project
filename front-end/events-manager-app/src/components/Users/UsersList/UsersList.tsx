import axios from "axios";
import { useEffect, useState } from "react";
import { CreateUserForm } from "../CreateUserForm/CreateUserForm";
import { TUser } from "./type";

export const UsersList = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isCreateUserFormOpen, setIsCreateUserFormOpen] = useState<boolean>(false);
  const [triger, setTriger] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:5000/users/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [triger]);

  const handleCreateUser = () => {
    setTriger(!triger);
  };

  const handleEditUser = (user: TUser) => {
    const { _id } = user;

    axios.post( `http://localhost:5000/users/${_id}`, { 
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      setTriger(!triger);
    })
    .catch((error) => {
      setError(error.message);
    });
  };



  const handleDeleteUser = (user: TUser) => {
    const { _id } = user;

    axios
      .delete(`http://localhost:5000/users/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUsers(users.filter((user) => user._id !== _id));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const onClose = () => {
    setIsCreateUserFormOpen(false);
  };

  return (
    <div>
      <h1>Users List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Event</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: TUser) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.age}</td>
              <td>{user.dateOfBirth}</td>
              <td>{user.email}</td>
              <td>{user.eventName || "-"}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setIsCreateUserFormOpen(true)}>Create New User</button>
      {isCreateUserFormOpen && <CreateUserForm onClose={onClose} onCreateUser={handleCreateUser} />}
    </div>
  );
};