
import { useNavigate } from "react-router-dom";
import { Navigator } from "../Navigator/Navigator"
import "./Header.css"

export const Header = () => {

    const tokenData = JSON.parse(localStorage.getItem("passport"));
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.removeItem("passport")
        navigate("/")
    }
    //Adding register navigation to allow move from header. Included a token validation to show register and login or icon to profile and log out (future)
    return (
        <div className="headerDesign">
            <Navigator title={"Home/Showcase"} sendTo={"/"} />

            {tokenData?.token ? (
                tokenData.decodificado.roleName === "super_admin" ? (
                    <div className="authMenu"> 
                    <Navigator
                    title={"Super Admin"} sendTo={"/superadmin"}
                    />
                    <Navigator
                        title={"Mis Citas"} sendTo={"/myAppointments"}
                    />
                    <Navigator
                        title={`${tokenData?.decodificado?.firstName}`} sendTo={"/profile"}
                    />
                    <div onClick={logOut}>
                        <Navigator title={"Cerrar sesión"} sendTo={"/"} />
                    </div>
                    </div>
                ) : (
                <div className="authMenu">
                    <Navigator
                        title={"Mis Citas"} sendTo={"/myAppointments"}
                    />
                    <Navigator
                        title={`${tokenData?.decodificado?.firstName}`} sendTo={"/profile"}
                    />
                    <div onClick={logOut}>
                        <Navigator title={"Cerrar sesión"} sendTo={"/"} />
                    </div>
                </div>
            )) : (
                <div className="authMenu">
                    <Navigator title={"Registro"} sendTo={"/register"} />
                    <Navigator title={"Login"} sendTo={"/login"} />
                </div>
            )
            }
        </div>
    )
}