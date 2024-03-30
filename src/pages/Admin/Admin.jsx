import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Admin = () => {

    const navigate = useNavigate()

    // useEffect(() => {
    //     if (tokenData.roleId !== "admin") {
    //     navigate ("/")
    // }}, [tokenData])

    useEffect(() => {
        if (dbData === false) {
            const getUserAppointments = async () => {
                try {
                    const fetched = await GetMyAppointments(tokenStorage)
                    setAppointments(fetched.data)
                    setdbData(true)
                } catch (error) {
                    console.log(error)
                }
            }
            getUserAppointments()
        }
    }, [appointments])


    return (
        <>
        </>
    )
}