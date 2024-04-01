
import { useNavigate } from "react-router-dom"
import { validame } from "../../utils/functions";
import { useState, useEffect } from "react";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";
import { decodeToken } from "react-jwt";
import { LoginUser } from "../../services/api.calls";
import "./Login.css"

export const Login = () => {

  const navigate = useNavigate()     //Defined navigate to send to other pages in some events

  const tokenData = JSON.parse(localStorage.getItem("passport"))  //Importing tokenData from localStorage

  // eslint-disable-next-line no-unused-vars
  const [tokenStorage, setTokenStorage] = useState(tokenData?.token)
  
  //Fields that login endpoint in back would need defined in accesData variable
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

  //inputHandler set the value in input to the variable of user to allow show in time value while typing
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

      const fetched = await LoginUser(accessData);                //fetched is response given by back when running LoginUser with parameters introduced in input
      if (fetched.success === true) {   
      setMsgError(`Hola de nuevo, nos alegra verte por TuTattoo!`) //if success is true, a welcome message throws and redirects to home. If not, user stays on login.
      setTimeout(() => {
        navigate("/")
      }, 1000)
      }else throw new Error("Email o password incorrectos")       //Error throwed when credentials are wrong


      const decodificado = decodeToken(fetched.token)

      const tokenData = {           //establishing the token and the info contained in it into tokenData variable
        token: fetched.token,
        decodificado: decodificado,
      }

      localStorage.setItem("passport", JSON.stringify(tokenData))   //saving tokenData variable in localStorage to access from other views

      

    } catch (error) {
      setMsgError(error.message);
      {console.log(error)}
    }
  };

  return (
    <div className="loginBackground">
      <div className="loginInfo">
        Inicie sesión para disfrutar de nuestros servicios
      </div>
      <CInput
        className={`inputDesign ${accessDataError.emailError !== "" ? "inputDesignError" : ""
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
        className={`inputDesign ${accessDataError.passwordError !== "" ? "inputDesignError" : ""
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
        functionEmit={loginMe}    //Calling loginMe function when button is clicked
      />
      <div className="error">{msgError}</div>
    </div> 
  );
}