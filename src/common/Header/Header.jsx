
import { useNavigate } from "react-router-dom";
import { Navigator } from "../Navigator/Navigator"
import "./Header.css"

export const Header = () => {

    const passport = JSON.parse(localStorage.getItem("passport"));
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.removeItem("passport")
        navigate("login")
    } 
    //Adding register navigation to allow move from header. Included a token validation to show register and login or icon to profile and log out (future)
    return (
        <div className = "headerDesign">
            <Navigator title={"home"} sendTo={"/"} />
                        
            {passport?.token ? (
                <div>  
                    <Navigator title={`Mi perfil`} sendTo={"/profile"} />
                    <Navigator title={"log out"} onClick={() => logOut()} />
                </div>
            ) : (
                <div className="authMenu">
                    <Navigator title={"register"} sendTo={"/register"} />
                    <Navigator title={"login"} sendTo={"/login"} />
                </div>
            )
            }
        </div>
    )
}