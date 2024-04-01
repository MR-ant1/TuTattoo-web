import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserCard } from "../../common/UserCard/UserCard"
import { CButton } from "../../common/CButton/CButton"
import { DeleteUserBySuperAdmin, GetUsers } from "../../services/api.calls"
import "./SuperAdmin.css"

export const SuperAdmin = () => {

    const navigate = useNavigate()
    const tokenData = JSON.parse(localStorage.getItem("passport"))
    const [dbData, setDbData] = useState(false)
    const [users, setUsers] = useState([])

    const tokenStorage = tokenData?.token

    useEffect(() => {
        if (tokenData.decodificado.roleName !== ("super_admin")) {
            navigate("/")
        }
    }, [tokenData])

    useEffect(() => {
        if (dbData === false) {
            const getUserList = async () => {
                try {
                    const fetched = await GetUsers(tokenStorage)    //Brings users and uses tokenStorage which contains token with the role that allows super admins
                    setUsers(fetched.data)
                    setDbData(true)

                } catch (error) {
                    console.log(error)
                }
            }
            getUserList()
        }
    }, [users])

    const deleteUser = async (id) => {
        try {
            if (id === tokenData?.decodificado?.userId) {
                throw new Error("cant delete super admin")
            }
            // eslint-disable-next-line no-unused-vars
            const fetched = await DeleteUserBySuperAdmin(tokenData, id) //Runs call to backend and send tokendata fot auth and user id to look the deleted user

            setUsers(
                users.filter((user) => user.id !== id) 
            )               //This filter returns a new array from the users data excepting the deleted user id when clicking. Card dissapears from view.
        } catch (error) {
            console.log(error)
        }
    }

    return (
            <div className="allUsersBackgroundDesign">
                {dbData !== true ? (
                    <div>LOADING</div>
                ) : (
                    <div className="userGrid">
                        {users.slice(0, users.length).map(  //Iteration of users with fetched data create a card for each object
                            user => {
                                return (
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
                                                    functionEmit={() => deleteUser(user.id)}
                                                />
                                            </div>
                                        </div>
                                )
                            })}
                    </div>
                )
                }
            </div>
    )
}



