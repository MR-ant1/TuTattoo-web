
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
        if (appointments.length === 0) {
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
            {appointments?.length > 0 ? (
                <div className="cardDesign">
                    {appointments.slice(0, (appointments.length + 1)).map(
                        appointment => {
                                <>
                                    <AppointmentCard
                                        appointmentDate={appointment.appointmentDate}
                                        serviceId={appointment.serviceId}
                                        userId={tokenData?.decodificado.userId}
                                    />
                                </>
                            
                        })}
                </div>
            ) : (
                <div>LOADING</div>
            )}

        </>
    )
}