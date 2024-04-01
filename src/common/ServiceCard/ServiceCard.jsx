
import "./ServiceCard.css"

// eslint-disable-next-line react/prop-types
export const Card = ({key, id, title, description, clickFunction}) => {

    return(
        <div className="cardDesign" onClick={clickFunction} key={key}>
            <div>{id}</div>
            <div className="titleDesign">{title}</div>
            <div>{description}</div>
        </div>
    )
}