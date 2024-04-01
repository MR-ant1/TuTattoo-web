
import { useNavigate } from "react-router-dom"
import "./Navigator.css"

// eslint-disable-next-line react/prop-types
export const Navigator = ({ title, sendTo }) => {

    const navigate = useNavigate()

    return (
        <div className="navigatorDesign" onClick={() => navigate(sendTo)}>
            {title}
        </div>
    )
}

//Here navigator is defined and will allow to move from any page to other one by importing it.