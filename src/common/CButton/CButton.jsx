
import "./CButton.css"

export const  CButton = ({className, title, emitFunction}) => {

    return (
        <div className={className} onClick={emitFunction} >
            {title}
        </div>
    )
}