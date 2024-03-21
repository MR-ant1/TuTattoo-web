
import "./Navigator.css"
import { useNavigate } from "react-router-dom"

export const Navigator = ({title, sendTo}) => {

    const navigate = useNavigate()

    return (
        <div className="navigatorDesign" onClick={() => navigate(sendTo)}>
            {title}
        </div>
    )
}