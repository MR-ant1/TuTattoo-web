
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppointmentCard } from "../../common/AppointmentCard/AppointmentCard"
import { GetMyAppointments } from "../../services/api.calls"
import "./MyAppointments.css"


const tokenData = JSON.parse(localStorage.getItem("passport"))

export const MyAppointments = () => {
    const [dbData, setdbData] = useState(false)
    const navigate = useNavigate()
    
    // eslint-disable-next-line no-unused-vars
    const [tokenStorage, setTokenStorage] = useState(tokenData?.token)

    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        if (!tokenStorage) {
            navigate("/")
        }
    }, [tokenStorage])

    useEffect(() => {
        if (appointments.length === 0) {
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
    console.log(appointments)

    return (
        <>
            <div className="myAppointmentsDesign">
                {dbData !== true ? (
                    <div>LOADING</div>
                ) : (
                    <div className="appointmentCardDesign">
                        {appointments.slice(0, appointments.length).map(
                            appointment => {
                                return(
                                <>
                                    <AppointmentCard
                                        appointmentDate={appointment.appointmentDate}
                                        service={appointment.service.serviceName}
                                        userId={appointment.user.id}
                                    />
                                </>
                            )})}
                    </div>
                )}
            </div>
        </>
    )
}