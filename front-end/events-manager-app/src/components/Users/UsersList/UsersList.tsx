import axios from "axios";
import { useEffect, useState } from "react";
import { CreateUserForm } from "../CreateUserForm/CreateUserForm";
import { TUser } from "./type";


export const UsersList = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isCreateUserFormOpen, setIsCreateUserFormOpen] = useState<boolean>(false);

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
  }, []);

  const handleCreateUser = (user: TUser) => {
    setIsCreateUserFormOpen(false);
    setUsers([...users, user]);
  };

  const onClose = () => { setIsCreateUserFormOpen(false); }

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
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setIsCreateUserFormOpen(true)}>Create New User</button>
      {isCreateUserFormOpen && (
        <CreateUserForm handleCreateUser={handleCreateUser} onClose={onClose} 
        />
      )}
    </div>
  );
};