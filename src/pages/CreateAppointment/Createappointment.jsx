
import { useState } from "react"
import { CreateAppointment } from "../../services/api.calls"
import { CInput } from "../../common/CInput/CInput"
import { CButton } from "../../common/CButton/CButton"
import { validame } from "../../utils/functions"
import "./CreateAppointment.css"


export const NewAppointment = () => {

    const tokenData = JSON.parse(localStorage.getItem("passport"))

    const [appointmentData, setAppointmentData] = useState({
        date: "",
        serviceId: "",
        userId: tokenData?.decodificado?.userId
    })
    
    const [appointmentDataError, setAppointmentDataError] = useState({
        dateError: "",
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
    
            const fetched = await CreateAppointment(appointmentData);
    
            setMsgError(fetched.message)

            
            // setTimeout(()=>{
            //   navigate("/")
            // },1000)
    
          } catch (error) {
            setMsgError(error.message);
          }
        }
    
      return (
        
        <div className="createAppointmentDesign">
          
          <CInput
            className={`inputDesign ${appointmentDataError.dateError !== "" ? "inputDesignError" : ""
            }`}
            type={"date"}
            placeholder={"date"}
            name={"date"}
            value={appointmentData.date || ""}
            onChangeFunction={(e) => inputHandler(e)}
          />
          <div className="error">{appointmentDataError.dateError}</div>
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
           {/* <CInput
            className={`inputDesign`}
            type={"text"}
            placeholder={`${tokenData?.decodificado.userId}`}
            name={"userId"}
            disabled={"disabled"}
            value={tokenData?.userId}
            onChangeFunction={(e) => inputHandler(e)}
          /> */}
          <CButton
            className={"cButtonDesign"}
            title={"Create appointment"}
            functionEmit={newAppointment}
          />
            {/* <div className="error">{msgError}</div> */}
        </div>
      );
}