
import { useState } from "react"
import { CreateAppointment } from "../../services/api.calls"
import { CInput } from "../../common/CInput/CInput"
import { CButton } from "../../common/CButton/CButton"
import { validame } from "../../utils/functions"
import { useNavigate } from "react-router-dom"
import "./CreateAppointment.css"

export const NewAppointment = () => {

    const navigate = useNavigate()
    const tokenData = JSON.parse(localStorage.getItem("passport"))

    // eslint-disable-next-line no-unused-vars
    const [tokenStorage, setTokenStorage] = useState(tokenData?.token)
    // {const appointmentDate = date + "T" + time }
    
    const [appointmentData, setAppointmentData] = useState({
        appointmentDate: "",
        serviceId: "",
        userId: tokenData?.decodificado?.userId
    })
    
    
    const [appointmentDataError, setAppointmentDataError] = useState({
        appointmentDateError: "",
        serviceIdError: ""
      });
    
      // eslint-disable-next-line no-unused-vars
      const [msgError, setMsgError] = useState("");
    
    
      const inputHandler = (e) => {
        setAppointmentData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
    
      const checkError = (e) => {
        const error = validame(e.target.name, e.target.value);
    
        setAppointmentDataError((prevState) => ({
          ...prevState,
          [e.target.name + "Error"]: error,
        }))};
      
      const newAppointment = async () => {
        try {
            // for (let elemento in appointmentData) {
            //   if (appointmentData[elemento] === "") {
            //     throw new Error("Todos los campos tienen que estar rellenos");
            //   }
            // }
    
            const fetched = await CreateAppointment(tokenStorage, appointmentData);
    
            setMsgError(fetched.message)

            fetched.success === true ?
            setTimeout(()=>{
              navigate("/")
            },2000)
            : navigate("/createAppointment")
    
          } catch (error) {
            setMsgError(error.message);
          }
        }
    
      return (
        
        <div className="backgroundImage">
          
          <CInput
            className={"inputDesign"}
            type={"timedate"}
            placeholder={"date&time (MM-DD-AAAA HH-NM-SS)"}
            name={"appointmentDate"}
            value={appointmentData.appointmentDate || ""}
            onChangeFunction={(e) => inputHandler(e)}
          />
          <CInput
            className={`inputDesign ${appointmentDataError.serviceIdError !== "" ? "inputDesignError" : ""
            }`}
            type={"text"}
            placeholder={"service Id (1-5)"}
            name={"serviceId"}
            value={appointmentData.serviceId || ""}
            onChangeFunction={(e) => inputHandler(e)}
            onBlurFunction={(e) => checkError(e)}
          />
            <div className="error">{appointmentDataError.serviceIdError}</div>
          <CButton
            className={"cButtonDesign"}
            title={"Create appointment"}
            functionEmit={newAppointment}
          />
            <div className="error">{msgError}</div>
        </div>
      );
}