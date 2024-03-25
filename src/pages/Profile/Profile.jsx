
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GetProfile, UpdateProfile } from "../../services/api.calls"
import { CInput } from "../../common/CInput/CInput"
import { validame } from "../../utils/functions"
import { CButton } from "../../common/CButton/CButton"
import "./Profile.css"




export const Profile = () => {
    
    const tokenData = JSON.parse(localStorage.getItem("passport"))
    const navigate = useNavigate()
    // eslint-disable-next-line no-unused-vars
    const [tokenStorage, setTokenStorage] = useState(tokenData?.token)
    const disabled = useState("disabled")
    const [dbData, setdbData] = useState(false)

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })

    const [userError, setUserError] = useState({
        firstNameError: "",
        lastNameError: "",
        emailError: ""
    })

    const [msgError, setMsgError] = useState("")

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const checkError = (e) => {
        const error = validame(e.target.name, e.target.value);

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }));
    };

    useEffect(() => {
        if (!tokenStorage) {
            navigate("/")
        }
    }, [tokenStorage])

    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        const getUserProfile = async () => {
            try {
                const fetched = await GetProfile(tokenStorage)

                setdbData(true)

                setUser({
                    firstName: fetched.data.firstName,
                    lastName: fetched.data.lastName,
                    email: fetched.data.email
                })

            } catch (error) {
                setMsgError(error.message)
            }
        }
        if (!dbData) {
            getUserProfile()
        }
    }, [user])

        const Update = async () => {
            try {
                const fetched = await UpdateProfile(tokenStorage, user)

                setMsgError(fetched.message)
                console.log(fetched)

                setTimeout(() => {
                    setMsgError("")
                }, 2000)

            } catch (error) {
                setMsgError(error.message)
            }
        }

    return (
        <div className="profileDesign">
            {!dbData ? (
                <div>LOADING</div>
            ) : (
                <div>
                    <CInput
                        className={`inputDesign ${userError.firstNameError !== "" ? "inputDesignError" : ""
                        }`}
                        type={"text"}
                        placeholder={""}
                        name={"firstName"}
                        disabled={""}
                        value={user.firstName || ""}
                        onChangeFunction={(e) => inputHandler(e)}
                        onBlurFunction={(e) => checkError(e)}
                    />
                    <div className="error">{user.firstNameError}</div>
                    <CInput
                        className={`inputDesign ${userError.lastNameError !== "" ? "inputDesignError" : ""
                            }`}
                        type={"text"}
                        placeholder={""}
                        name={"lastName"}
                        disabled={""}
                        value={user.lastName || ""}
                        onChangeFunction={(e) => inputHandler(e)}
                        onBlurFunction={(e) => checkError(e)}
                    />
                    <div className="error">{user.lastNameError}</div>
                    <CInput
                        className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
                            }`}
                        type={"text"}
                        placeholder={""}
                        name={"email"}
                        disabled={disabled}
                        value={user.email || ""}
                        onChangeFunction={(e) => inputHandler(e)}
                        onBlurFunction={(e) => checkError(e)}
                    />
                    <div className="error">{user.emailError}</div>
                    <CButton
                        className={"cButtonDesign"}
                        title={"Actualizar datos"}
                        functionEmit={Update}
                    />
                    <div className="error">{msgError}</div>
                </div>
            )} 
        </div>
    )
}