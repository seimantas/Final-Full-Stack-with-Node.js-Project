import { Route, Routes } from "react-router"
import { FC } from "react";
import { BrowserRouter } from "react-router-dom"
import { AdminLogin } from "../AdminLogin"
import { Events } from "../Events"
import { Header } from "../Header"
import { PageNotFound } from "../PageNotFound"
import { RegisterAdmin } from "../RegisterAdmin/RegisterAdmin"
import { UsersList } from "../Users/UsersList"

export const ManeRouter:FC = () => {

    return (
        <BrowserRouter>
        <Header/>
       
        <Routes>
            <Route path="/" element={<AdminLogin/>}/>
            <Route path="/admin-registration" element={<RegisterAdmin  />} />
            <Route path="/events" element={<Events/>} />
            <Route path="/users-list" element={<UsersList/>} />
            <Route path="*" element={<PageNotFound/>} />
       </Routes>
    </BrowserRouter>
)
}