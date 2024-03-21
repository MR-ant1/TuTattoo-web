
import { Navigator } from "../Navigator/Navigator"
import "./Header.css"

export const Header = () => {

    const token = false

    const logOut = () => {
        
    } //Adding register navigation to allow move from header. Included a token validation to show register and login or icon to profile and log out (future)
    return (
        <div className = "headerDesign">
            <Navigator title={"home"} sendTo={"/"} />
                        
            {token ? (
                <div>  
                    <Navigator title={"nickdelusuario"} sendTo={"/"} />
                    <Navigator title={"log out"} onClick={() => logOut()} />
                </div>
            ) : (
                <div>
                    <Navigator title={"register"} sendTo={"/register"} />
                </div>
            )
            }
        </div>
    )
}