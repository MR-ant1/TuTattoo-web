

import "./RegisterButton.css"

// eslint-disable-next-line react/prop-types 
export const RegisterButton = ({ className, title, functionemit }) => {

    return (
        <div className={className} onClick={functionemit} >
            {title}
        </div>
    )
}
