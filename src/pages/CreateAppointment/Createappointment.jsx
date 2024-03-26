
import { useState } from "react"
import { CreateAppointment } from "../../services/api.calls"
import { CInput } from "../../common/CInput/CInput"
import { CButton } from "../../common/CButton/CButton"
import "./CreateAppointment.css"


export const NewAppointment = () => {

    const tokenData = JSON.parse(localStorage.getItem("passport"))
    // eslint-disable-next-line no-unused-vars
    const [tokenStorage, setTokenStorage] = useState(tokenData?.token)

    const [appointmentData, setAppointmentData] = useState({
        date: "",
        serviceId: "",
        userId: tokenData?.userId

    })

    // const [appointmentDataError, setAppointmentDataError] = useState({
    //     dateError: "",
    //     serviceIdError: "",
    //     userIdError: ""
    //   });
    
      const [msgError, setMsgError] = useState("");
    
    
      const inputHandler = (e) => {
        setAppointmentData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
    
      // const checkError = (e) => {
      //   const error = validame(e.target.name, e.target.value);
    
        // setAppointmentData((prevState) => ({
        //   ...prevState,
        //   [e.target.name + "Error"]: error,
        // }));
      

      const createAppointment = async () => {
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
        <>
        <div className="createAppointmentDesign">
          
          <CInput
            className={`inputDesign`}
            type={"date"}
            placeholder={"date"}
            name={"date"}
            value={appointmentData.date || ""}
            onChangeFunction={(e) => inputHandler(e)}
          />
          <CInput
            className={`inputDesign`}
            type={"text"}
            placeholder={"service Id"}
            name={"serviceId"}
            value={appointmentData.serviceId || ""}
            onChangeFunction={(e) => inputHandler(e)}
          />
           <CInput
            className={`inputDesign`}
            type={"number"}
            placeholder={tokenData?.userId}
            name={"userId"}
            disabled={"disabled"}
            value={tokenData?.userId}
            onChangeFunction={(e) => inputHandler(e)}
          />
    
          <CButton
            className={"cButtonDesign"}
            title={"Create Appointment"}
            functionEmit={createAppointment()}
          />
          
        </div>
        </>
      );
}