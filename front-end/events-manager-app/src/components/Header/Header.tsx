import { FC, useContext, } from "react";
import { Link, useNavigate} from "react-router-dom"
import { ItHavePremissionContext } from "../ItHavePremissinContext";



export const Header : FC = () => {
    const { isLogdin, setIsLogdin } = useContext(ItHavePremissionContext);
    const navigate = useNavigate();
    
    const toLogout = () => {
    localStorage.removeItem("token"); 
    setIsLogdin(false); 
    navigate("/")
  };

    return (
        <>
            <img src="" alt="event-manager-malogo" />
            <h1>Event Manager</h1>
            {isLogdin ? (
             <div>
                <button><Link to="/events">Events</Link></button>
                <button><Link to="/users-list">Users</Link></button>
                <button onClick={toLogout}>Log out</button>
                </div> 
            ) : (
                <p>You are not logged in</p>
            )}
        </>
    )
}