import "./AppointmentCard.css"

// eslint-disable-next-line react/prop-types
export const AppointmentCard = ({appointmentDate, service, userId}) => {

    return(
        <div className="cardDesign">
            <div>{appointmentDate}</div>
            <div>{service}</div>
            <div>{userId}</div>
        </div>
    )
}