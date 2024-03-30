
import { Route, Routes, Navigate } from "react-router-dom"
import { Home } from "../Home/Home"
import { Register } from "../Register/Register"
import { Login } from "../Login/Login"
import { Profile } from "../Profile/Profile"
import { NewAppointment } from "../CreateAppointment/CreateAppointment"
import { MyAppointments } from "../MyAppointments/MyAppointments"
import { SuperAdmin } from "../SuperAdmin/SuperAdmin"

export const Body = () => {

    return (
        <Routes>
            <Route path="*" element={<Navigate to={"/"} replace />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/createAppointment" element={<NewAppointment />} />
            <Route path="/myAppointments" element={<MyAppointments />} />
            <Route path="/superadmin" element={<SuperAdmin />} />
        </Routes>
    )
}