import "./AppointmentCard.css"

// eslint-disable-next-line react/prop-types
export const AppointmentCard = ({appointmentDate, serviceId, userId}) => {

    return(
        <div className="cardDesign">
            <div>{appointmentDate}</div>
            <div>{serviceId}</div>
            <div>{userId}</div>
        </div>
    )
}