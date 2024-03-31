
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
        if (dbData === false) {
            const getUserAppointments = async () => {
                try {
                    const fetched = await GetMyAppointments(tokenStorage)
                    setAppointments(fetched.data)
                    setdbData(true)
                } catch (error) {
                    console.log(error)
                }
            }
            getUserAppointments()
        }
    }, [appointments])

    const deleteMyappointment = async (id) => {
        try {
            // eslint-disable-next-line no-unused-vars
            const fetched = await DeleteAppointmentById(tokenData, id)
            setAppointments (
                appointments.filter((appointment) => appointment.id !== id)
                )
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
                        <div>
                        {appointments.map(
                            appointment => {
                                return (
                                    <>
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
                                    </>
                                )
                            })}
                    </div>
                )
                }
            </div>
        </>
    )
}