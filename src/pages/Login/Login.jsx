

import { useNavigate } from "react-router-dom"
import { validame } from "../../utils/functions";
import { useState, useEffect } from "react";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";import { decodeToken } from "react-jwt";
import { LoginUser } from "../../services/api.calls";
import "./Login.css"


const tokenData = JSON.parse(localStorage.getItem("passport"))

export const Login = () => {

    const navigate = useNavigate()

    // eslint-disable-next-line no-unused-vars
    const [tokenStorage, setTokenStorage] = useState(tokenData?.token)

    const [accessData, setAccessData] = useState({
        email: "",
        password: "",
    })

    const [accessDataError, setAccessDataError] = useState({
        emailError: "",
        passwordError: "",
      });
    
      const [msgError, setMsgError] = useState("");

      useEffect(() => {
        if (tokenStorage) {
            navigate("/")
        }
      }, [tokenStorage])
    
    
      const inputHandler = (e) => {
        setAccessData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
    
      const checkError = (e) => {
        const error = validame(e.target.name, e.target.value);
    
        setAccessDataError((prevState) => ({
          ...prevState,
          [e.target.name + "Error"]: error,
        }));
      };
    
      const loginMe = async () => {
        try {
            for (let elemento in accessData) {
              if (accessData[elemento] === "") {
                throw new Error("Todos los campos tienen que estar rellenos");
              }
            }
    
            const fetched = await LoginUser(accessData);
    
            const decodificado = decodeToken(fetched.token)
    
            const passport = {
                token: fetched.token,
                decodificado: decodificado,
            }
    
            localStorage.setItem("passport", JSON.stringify(passport))
    
            setMsgError(`Hola de nuevo, nos alegra verte por tuTattoo!`)
    
            setTimeout(()=>{
              navigate("/")
            },1000)
    
          } catch (error) {
            setMsgError(error.message);
          }
      };
    
      return (
        <div className="loginDesign">
          <CInput
            className={`inputDesign ${
              accessDataError.emailError !== "" ? "inputDesignError" : ""
            }`}
            type={"email"}
            placeholder={"email"}
            name={"email"}
            value={accessData.email || ""}
            onChangeFunction={(e) => inputHandler(e)}
            onBlurFunction={(e) => checkError(e)}
          />
          <div className="error">{accessData.emailError}</div>
          <CInput
            className={`inputDesign ${
              accessDataError.passwordError !== "" ? "inputDesignError" : ""
            }`}
            type={"password"}
            placeholder={"password"}
            name={"password"}
            value={accessData.password || ""}
            onChangeFunction={(e) => inputHandler(e)}
            onBlurFunction={(e) => checkError(e)}
          />
          <div className="error">{accessDataError.passwordError}</div>
    
          <CButton
            className={"cButtonDesign"}
            title={"Login"}
            functionEmit={loginMe}
          />
          <div className="error">{msgError}</div>
        </div>
      );
}