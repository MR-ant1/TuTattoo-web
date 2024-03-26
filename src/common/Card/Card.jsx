
import "./Card.css"

// eslint-disable-next-line react/prop-types
export const Card = ({id, title, description, clickFunction}) => {

    return(
        <div className="cardDesign" onClick={clickFunction}>
            <div>{id}</div>
            <div className="titleDesign">{title}</div>
            <div>{description}</div>
        </div>
    )
}