
import "./CButton.css"

// eslint-disable-next-line react/prop-types 
export const CButton = ({ className, title, functionEmit }) => {

    return (
        <div className={className} onClick={functionEmit} >
            {title}
        </div>
    )
}