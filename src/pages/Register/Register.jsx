
import { useState } from "react"
import { CInput } from "../../common/CInput/CInput"
import { CButton } from "../../common/CButton/CButton"
import "./Register.css"

export const Register = () => {

const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
})
 
const inputHandler = (e) => {
    setUser((prevState) => ({
        ...prevState,
        [e.target.name]: [e.target.value]
    }))
}

const registration = () => {
    console.log("register Botton")
}
return (
    <div className="registerDesign">
        <CInput
            className={"inputDesign"}
            type={"text"}
            placeholder={"firstName"}
            name={"firstName"}
            value={user.firstName || ""}
            onChangeFunction={(e) => inputHandler(e)}
        />
        <CInput
            className={"inputDesign"}
            type={"text"}
            placeholder={"lastName"}
            name={"lastName"}
            value={user.lastName || ""}
            onChangeFunction={(e) => inputHandler(e)}
        />
        <CInput
            className={"inputDesign"}
            type={"text"}
            placeholder={"email"}
            name={"email"}
            value={user.email || ""}
            onChangeFunction={(e) => inputHandler(e)}
        />
        <CInput
            className={"inputDesign"}
            type={"text"}
            placeholder={"password"}
            name={"password"}
            value={user.password || ""}
            onChangeFunction={(e) => inputHandler(e)}
        />
        <CButton
            className={"cButtonDesign"}
            title={"Register"}
            functionEmit={registration}
        />
    </div>
)

}