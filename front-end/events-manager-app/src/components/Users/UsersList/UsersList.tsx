import axios from "axios";
import { FC, useEffect, useState } from "react";
import { CreateUserForm } from "../CreateUserForm/CreateUserForm";
import { EditUserForm } from "../EditUserForm";
import { TUser } from "./type";
import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';




export const UsersList:FC = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isCreateUserFormOpen, setIsCreateUserFormOpen] = useState<boolean>(false,);
  const [triger, setTriger] = useState<boolean>(false);
const [isEditUserFormOpen, setIsEditUserFormOpen] = useState<boolean>(false);

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

  const handleRenderList = () => {
    setTriger(!triger);
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

  const handleClose = () => {
    setIsCreateUserFormOpen(false);
    setIsEditUserFormOpen(false);
  };
  return (
    <div>
      <Typography variant="h1">Users List</Typography>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>Error: {error}</Typography>}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Event</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.dateOfBirth}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.eventName || '-'}</TableCell>
                <TableCell>
                  <Button onClick={() => setIsEditUserFormOpen(true)}>Edit</Button>
                  <Button onClick={() => handleDeleteUser(user)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => setIsCreateUserFormOpen(true)}>Create New User</Button>
      <Dialog open={isCreateUserFormOpen || isEditUserFormOpen} onClose={handleClose}>
        <DialogTitle>{isCreateUserFormOpen ? 'Create New User' : 'Edit User'}</DialogTitle>
        <DialogContent>
        {<CreateUserForm isOpen onClose={handleClose} onCreateUser={handleRenderList} />}
        {<EditUserForm isOpen user={{}} onClose={handleClose} onCreateUser={handleRenderList} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRenderList}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};




