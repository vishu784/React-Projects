import { auth, provider } from "../config/firebase"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"


export const Login = () => {
  const navigate = useNavigate();

    const signInWithGoogle = async () => {
       const result = await signInWithPopup(auth, provider) 
       console.log(result)
       navigate("/")
    }


    return (
        <div className="signIn">
            <p> Sign in With Google to continue</p>
            <button onClick={signInWithGoogle}>Sign in With Google</button>
          
        </div>
    )
}