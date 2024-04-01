
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppointmentCard } from "../../common/AppointmentCard/AppointmentCard"
import { DeleteAppointmentById, GetMyAppointments } from "../../services/api.calls"
import { CButton } from "../../common/CButton/CButton"
import "./MyAppointments.css"


export const MyAppointments = () => {

    const [dbData, setdbData] = useState(false)
    const navigate = useNavigate()
    const tokenData = JSON.parse(localStorage.getItem("passport"))


    // eslint-disable-next-line no-unused-vars
    const [tokenStorage, setTokenStorage] = useState(tokenData?.token)

    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        if (!tokenStorage) {
            navigate("/")
        }
    }, [tokenStorage])

    useEffect(() => {
        if (dbData === false) {                         //When dbData is false, getUserAppointments brings them only if the user owns that appointments
            const getUserAppointments = async () => {
                try {
                    const fetched = await GetMyAppointments(tokenStorage)   //tokenStorage as a parameter to allow search appointments with the user's id
                    setAppointments(fetched.data)   //pushing data to appointments array
                    setdbData(true)                    //Finally if all previous actions are done, dbData is setted to true. Now this acn be used in a condition
                } catch (error) {
                    console.log(error)
                }
            }
            getUserAppointments()
        }
    }, [appointments])

    //Delete function sends appointment id (using the id in clicked button) and tokenData to check if its a self appointment.
    const deleteMyappointment = async (id) => {
        try {
            // eslint-disable-next-line no-unused-vars
            const fetched = await DeleteAppointmentById(tokenData, id)
            setAppointments(    
                appointments.filter((appointment) => appointment.id !== id) 
            )                  //Removing the deleted appointment from view with no need of reload. Compare all user ids with the selected to delete and excludes it.
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="myAppointmentsBackgroundDesign">
                {dbData !== true ? (
                    <div>LOADING</div>
                ) : (
                    <div className="appointmentsGrid">
                        {appointments.map(
                            appointment => {
                                return (
                                        <div className="appointmentsDeleteListDesign" key={appointment.id}>
                                            <AppointmentCard
                                                appointmentDate={appointment.appointmentDate}
                                                service={appointment.service.serviceName}
                                            />
                                            <div className="deleteAppointmentDesign">
                                                <CButton
                                                    className={"cButtonDesign"}
                                                    title={"Delete Appointment"}
                                                    functionEmit={() => deleteMyappointment(appointment.id)}
                                                />
                                            </div>
                                        </div>
                                )
                            })}
                    </div>
                )
                }
            </div>
        </>
    )
}