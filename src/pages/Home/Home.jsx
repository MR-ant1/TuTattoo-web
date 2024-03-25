
import { GetServices } from "../../services/api.calls"
import "./Home.css"

export const Home = () => {

    //const navigate

    const [dbData, setdbData] = useState(false)
    const disabled = useState("disabled")
    
    const [services, setServices] = useState({
        serviceName:"",
        description: ""
    })

    // const serviceError?

    //const inputhandler?

    // useEffect para click en card ID?

    useEffect(() => {
        const servicesShowcase = async () => {
        try {
            const fetched = await GetServices()

            setdbData(true)

            setServices({
                serviceName: fetched.data.serviceName,
                description: fetched.data.description
            })

        } catch (error) {
            console.log(error)
        }
        if (!dbData) {
            servicesShowcase
        }
    }}, [services])

return (
    <div className="HomeDesign">
        {!dbData ? (
            <div>LOADING</div>
        ) : (
            <card
        )}
    </div>
)

}