import "./AppointmentCard.css"

// eslint-disable-next-line react/prop-types
export const AppointmentCard = ({ key, appointmentDate, service }) => {

    return (
        <div className="appointmentCardDesign" key={key}>
            <div>{appointmentDate}</div>
            <div>{service}</div>
        </div>
    )
}