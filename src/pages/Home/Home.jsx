
import { useEffect, useState } from "react"
import { GetServices } from "../../services/api.calls"
import { Card } from "../../common/Card/Card"
import "./Home.css"

export const Home = () => {

    //const navigate

    // eslint-disable-next-line no-unused-vars
    const [dbData, setDbData] = useState(false)
    
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
            const fetched = await GetServices()

            setDbData(true)

            setServices({
                serviceName: fetched.data.serviceName,
                description: fetched.data.description
            })
            
        } catch (error) {
            console.log(error)
        }
    }}, [services])

return (
    <div className="HomeDesign">
        {setDbData===false ? (
            <div>LOADING</div>
        ) : 
        (
            <div>
                <div className="upServices">
                <Card
                className={"cardDesign"}
                type={"text"}
                name={"Service"}
                valuename={services.serviceName}
                valuedescription={services.description}
                />
                <Card
                className={"cardDesign"}
                type={"text"}
                name={"Service"}
                valueName={services.serviceName}
                valueDescription={services.description}
                />
                </div>
                <div className="downServices">
                <Card
                className={"cardDesign"}
                type={"text"}
                name={"Service"}
                valueName={services.serviceName}
                valueDescription={services.description}
                />
                <Card
                className={"cardDesign"}
                type={"text"}
                name={"Service"}
                valueName={services.serviceName}
                valueDescription={services.description}
                />
                <Card
                className={"cardDesign"}
                type={"text"}
                name={"Service"}
                valueName={services.serviceName}
                valueDescription={services.description}
                />
                </div>
            </div>
            
        )}
    </div>
)

}