
import { useEffect, useState } from "react"
import { GetServices } from "../../services/api.calls"
import { Card } from "../../common/ServiceCard/ServiceCard"
import { useNavigate } from "react-router-dom"
import "./Home.css"

export const Home = () => {

    const navigate = useNavigate()
    const tokenData = JSON.parse(localStorage.getItem("passport"))
    // eslint-disable-next-line no-unused-vars
    const [tokenStorage, setTokenStorage] = useState(tokenData?.token)


    // const [dbData, setDbData] = useState(false)

    const [services, setServices] = useState([])

    // const serviceError?

    //const inputhandler?

    // useEffect para click en card ID?

    useEffect(() => {
        if (services.length === 0) {
            const servicesShowcase = async () => {
                try {
                    const fetched = await GetServices()

                    setServices(fetched.data)

                } catch (error) {
                    console.log(error)
                }
            }
            servicesShowcase()
        }
    }, [services])



    return (
        <>
            {services.length > 0 ? (
                <div className="backgroundImage">
                        {services.slice(0, 5).map(
                            service => {
                                return (
                                    <>
                                        <Card
                                            id={"Nª servicio: " + service.id}
                                            title={service.serviceName}
                                            description={service.description}
                                            clickFunction={() => !tokenData?.token
                                                ? navigate("/login")
                                                : navigate("/createAppointment")
                                            }
                                        />
                                    </>
                                )
                            })}
                    </div>
            ) : (
                <div>LOADING</div>
            )}

        </>
    )
}
