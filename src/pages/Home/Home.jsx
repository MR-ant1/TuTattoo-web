
import { useEffect, useState } from "react"
import { GetServices } from "../../services/api.calls"
import "./Home.css"

export const Home = () => {

    //const navigate

    const [dbData, setDbData] = useState(false)
    // const disabled = useState("disabled")
    
    const [services, setServices] = useState({
        serviceName:"",
        description: ""
    })

    // const serviceError?

    //const inputhandler?

    // useEffect para click en card ID?

    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        const servicesShowcase = async () => {
        try {
            const fetched = await GetServices(services)

            setDbData(true)

            setServices({
                serviceName: fetched.data.serviceName,
                description: fetched.data.description
            })
            
        } catch (error) {
            console.log(error)
        }
        // if (!dbData) { 
        //     servicesShowcase()
        // }
    }}, [services])

return (
    <div className="HomeDesign">
        {setDbData===false ? (
            <div>LOADING</div>
        ) : (
            <div>Aqui irán las cards</div>
        )}
    </div>
)

}