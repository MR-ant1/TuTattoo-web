
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppointmentCard } from "../../common/AppointmentCard/AppointmentCard"
import { GetMyAppointments } from "../../services/api.calls"
import "./MyAppointments.css"


const tokenData = JSON.parse(localStorage.getItem("passport"))

export const MyAppointments = () => {

    const navigate = useNavigate()

    // eslint-disable-next-line no-unused-vars
    const [tokenStorage, setTokenStorage] = useState(tokenData?.token)

    const [appointments, setAppointments] = useState([])

    if (!tokenStorage) {
        navigate("/")
    }

    useEffect(() => {
        if (appointments?.length === 0) {
            const getUserAppointments = async () => {
                try {
                    const fetched = await GetMyAppointments()
                    setAppointments(fetched.data)

                } catch (error) {
                    console.log(error)
                }
            }
            getUserAppointments()
        }
    }, [appointments])

    return (
    <>
        <div className="myAppointmentsDesign">
            {appointments?.length > 0 ? (
                <div className="appointmentCardDesign">
                {appointments.slice(0, 68).map(
                    appointment => {
                    <>
                        <AppointmentCard
                            appointmentDate={appointment.appointmentDate}
                            service={appointment.service}
                        />
                    </>
                })}
            </div>
                
            ) : (
                <div>LOADING</div>  
            )}
        </div>
    </>
    )
}