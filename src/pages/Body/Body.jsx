
import { Route, Routes } from "react-router-dom"
import { servicesHome } from "../servicesHome/servicesHome"
import { Register } from "../Register/Register"

export const Body = () => {
    
    return (
        <Routes>
            <Route path="/" element={<servicesHome />} />
            <Route path="/register" element={<Register />} />

        </Routes>
    )
}