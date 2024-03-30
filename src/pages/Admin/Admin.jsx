import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserCard } from "../../common/UserCard/UserCard"
import { CButton } from "../../common/CButton/CButton"

export const Admin = () => {

    const navigate = useNavigate()
    const tokenData = JSON.parse(localStorage.getItem("passport"))
    const [dbData, setDbData] = useState(false)
    const [users, setUsers] = useState([])
    
    const tokenStorage= tokenData?.token

    useEffect(() => {
        if (tokenData.roleName !== ("super_admin")) {
        navigate ("/")
    }}, [tokenData])

    useEffect(() => {
        if (dbData === false) {
            const getUserList = async () => {
                try {
                    const fetched = await getUsers(tokenStorage)
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
            <div className="myAppointmentsDesign">
                {dbData !== true ? (
                    <div>LOADING</div>
                ) : (
                        <div>
                        {users.map(
                            user => {
                                return (
                                    <>
                                     <div className="appointmentsDeleteListDesign" key={user.id}>
                                        <UserCard
                                            firstName={user.firstName}
                                            lastName={user.lastName}  
                                            email={user.email}
                                            roleName={user.role.name} 
                                        />
                                        <div className="deleteAppointmentDesign">
                                            <CButton 
                                            className={"cButtonDesign"}
                                            title={"Delete Appointment"}
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
        

        
    