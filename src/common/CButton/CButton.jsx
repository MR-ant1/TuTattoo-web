
import "./CButton.css"

// eslint-disable-next-line react/prop-types 
export const CButton = ({ className, title, functionEmit }) => {

    return (
        <div className={className} onClick={functionEmit} >
            {title}
        </div>
    )
}

//CButton receives a className to edit its design, a title prop to show on each different button and a functionEmit containing a function to run in each button