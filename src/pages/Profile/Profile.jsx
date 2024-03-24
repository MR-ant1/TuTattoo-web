
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GetProfile } from "../../services/api.calls"
import { CInput } from "../../common/CInput/CInput"
import { validame } from "../../utils/functions"
import "./Profile.css"

const tokenData = JSON.parse(localStorage.getItem("passport"))

export const Profile = () => {
    const navigate = useNavigate()
    // eslint-disable-next-line no-unused-vars
    const [tokenStorage, setTokenStorage] = useState(tokenData?.token)
    const [dbData, setdbData] = useState(false)

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [userError, setUserError] = useState({
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordError: ""
    })

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
                console.log(error)
            }
        }
        if (!dbData) {
            getUserProfile()
        }
    }, [user])

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
                        value={user.email || ""}
                        onChangeFunction={(e) => inputHandler(e)}
                        onBlurFunction={(e) => checkError(e)}
                    />
                    <div className="error">{user.emailError}</div>
                </div>
            )}
        </div>
    )
}