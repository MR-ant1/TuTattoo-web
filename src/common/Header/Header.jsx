
import { useNavigate } from "react-router-dom";
import { Navigator } from "../Navigator/Navigator"
import "./Header.css"

export const Header = () => {

    const tokenData = JSON.parse(localStorage.getItem("passport"));
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.removeItem("passport")
        navigate("login")
    }
    //Adding register navigation to allow move from header. Included a token validation to show register and login or icon to profile and log out (future)
    return (
        <div className="headerDesign">
            <Navigator title={"Home/Showcase"} sendTo={"/"} />

            {tokenData?.token ? (
                <div className="authMenu">
                    <Navigator
                        title={`${tokenData?.decodificado?.firstName}`} sendTo={"/profile"}
                    />
                    <div onClick={logOut}>
                        <Navigator title={"log out"} sendTo={"/"} />
                    </div>
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