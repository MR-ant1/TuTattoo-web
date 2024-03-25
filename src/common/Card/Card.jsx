
import "./Card.css"

// eslint-disable-next-line react/prop-types
export const Card = ({className, type, name}) => {

    return(
        <div
            className={className}
            type={type}
            name={name}
        />
    )
}