import "./AppointmentCard.css"

// eslint-disable-next-line react/prop-types
export const AppointmentCard = ({appointmentDate, service}) => {

    return(
        <div className="cardDesign">
            <div>{appointmentDate}</div>
            <div>{service}</div>
        </div>
    )
}