
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
            <Navigator title={"Inicio/Catalogo"} sendTo={"/"} />

            {tokenData?.token ? (                                           //Condition to use header for not logged users/logged users
                tokenData.decodificado.roleName === "super_admin" ? (       // This second condition checks if the user is super_admin to show that page or not
                    <div className="authMenu">
                        <Navigator
                            title={"Super Admin"} sendTo={"/superadmin"}
                        />
                        <Navigator                                          //LOGGED AND USER IS SUPER ADMIN
                            title={"Mis Citas"} sendTo={"/myAppointments"}
                        />
                        <Navigator
                            title={`${tokenData?.decodificado?.firstName}`} sendTo={"/profile"}
                        />
                        <div onClick={logOut}>
                            <Navigator title={"Cerrar sesión"} sendTo={"/"} />
                        </div>
                    </div>
                ) : (                                                       // LOGGED AND USER IS NOT A SUPER ADMIN
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
                )) : (                                                      //Here start the sections for header when no logged
                <div className="authMenu">
                    <Navigator title={"Registro"} sendTo={"/register"} />
                    <Navigator title={"Login"} sendTo={"/login"} />
                </div>
            )
            }
        </div>
    )
}