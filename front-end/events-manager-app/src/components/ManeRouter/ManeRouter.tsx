import { Route } from "react-router"
import { BrowserRouter } from "react-router-dom"
import { Header } from "../Header"
import { PageNotFound } from "./PageNotFound"

export const ManeRouter = () => {

return (
    <BrowserRouter>
       <Header />

       <Route/>
       <Route/>
       <Route/>
       <Route path="*" element={<PageNotFound/>} />
       </BrowserRouter>
       )}