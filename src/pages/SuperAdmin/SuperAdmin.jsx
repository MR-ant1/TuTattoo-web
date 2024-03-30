import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserCard } from "../../common/UserCard/UserCard"
import { CButton } from "../../common/CButton/CButton"
import { GetUsers } from "../../services/api.calls"

export const SuperAdmin = () => {

    const navigate = useNavigate()
    const tokenData = JSON.parse(localStorage.getItem("passport"))
    const [dbData, setDbData] = useState(false)
    const [users, setUsers] = useState([])
    
    const tokenStorage= tokenData?.token

    useEffect(() => {
        if (tokenData.decodificado.roleName !== ("super_admin")) {
        navigate ("/")
    }}, [tokenData])

    useEffect(() => {
        if (dbData === false) {
            const getUserList = async () => {
                try {
                    const fetched = await GetUsers(tokenStorage)
                    setUsers(fetched.data)
                    setDbData(true)
                    
                } catch (error) {
                    console.log(error)
                }
            }
            getUserList()
        }
    }, [users])


    return (
        <>
            <div className="allUsersDesign">
                {dbData !== true ? (
                    <div>LOADING</div>
                ) : (
                        <div>
                        {users.slice(0, users.length).map(
                            user => {
                                return (
                                    <>
                                     <div className="userListDesign" key={user.id}>
                                        <UserCard
                                            firstName={user.firstName}
                                            lastName={user.lastName}  
                                            email={user.email}
                                        />
                                        <div className="deleteAppointmentDesign">
                                            <CButton 
                                            className={"cButtonDesign"}
                                            title={"Delete User"}
                                            // functionEmit={() => (appointment.id)}
                                            />
                                        </div>
                                        </div>
                                    </>
                                )
                            })}
                    </div>
                )
                }
            </div>
        </>
    )
}
        

        
    