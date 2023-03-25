import { FC, useState } from "react";
import { Link} from "react-router-dom";

export const Header : FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {    
        setIsLoggedIn(false);
    
    }

    return (
        <>
            <img src="https://www.technocrazed.com/wp-content/uploads/2015/12/Event-Management-System-Project-in-Java.jpg" alt="event-manager-malogo" />
            <h1>Event Manager</h1>
            
            {isLoggedIn ? (
             <>
                <button><Link to="/events">Events</Link></button>
                <button><Link to="/users-list">Users</Link></button>
             </> 
            ) : (   
                <button>Login</button>
            )}
        </>
    )
}