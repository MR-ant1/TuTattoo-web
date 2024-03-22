
import { useState } from "react"
import { CInput } from "../../common/CInput/CInput"
import "./Register.css"

export const Register = () => {

const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
})
 
const inputHandler = (e) => {
    console.log(e.target.value)
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
    </div>
)

}