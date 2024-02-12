import { Link } from "react-router-dom"
import { auth } from "../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import{signOut} from 'firebase/auth'
 
export const Navbar = () => {

    
    const [user] =useAuthState(auth) 

    const signUserOut = async () => {
        await signOut(auth)

    }
    return ( 
        <div className="navbar">
            <div className="links">
       <Link  to="/">  Home</Link>

        {!user ? (<Link  to="/login">  Login</Link> ): ( <Link to="/post" > Post </Link> )}
       {/* if there are no user  credentials then show login, else show "CREATE POST LINK" */}
       </div>
            <div className="user">

            {user && (
                <>
                <p >{user?.displayName}</p>
                <img  src={user?.photoURL || "" } alt="nope" width="50px" height="50px" />
                <button onClick={signUserOut}>Logout</button>
                </>

            )}
                {/* <p className="userInfo">{auth.currentUser?.displayName}</p>
                <img  src={auth.currentUser?.photoURL || ""} width="100px" height="100px" />
                 */}
            </div>

       </div>
    )
}