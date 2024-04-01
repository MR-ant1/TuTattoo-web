
const root = "http://localhost:4001/api/"

export const RegisterUser = async (user) => {

    const clientData = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)          //sending body with fields from user data to make the endpoint work correctly.
    };
    try {

        const response = await fetch(`${root}auth/register`, clientData)    //variable response with saved data from fetching info to endpoint route

        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message)
        }

        return data

    } catch (error) {
        return error;
    }


}

export const LoginUser = async (accessData) => {

    const clientData = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(accessData)
    }

    try {
        const response = await fetch(`${root}auth/login`, clientData)

        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message)
        }

        return data

    } catch (error) {
        return error
    }
}

export const GetProfile = async (token) => {
    const clientData = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`          //adding token in authorization to pass the auth middleware in backend
        }
    }

    try {
        const response = await fetch(`${root}users/profile`, clientData)

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message)
        }

        return data

    } catch (error) {
        return error
    }
}

export const UpdateProfile = async (token, updateData) => {
    const clientData = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
    }

    try {
        const response = await fetch(`${root}users/profile`, clientData)

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message)
        }

        return data

    } catch (error) {
        return error
    }
}

export const GetServices = async () => {
    const clientData = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }

    try {
        const response = await fetch(`${root}services`, clientData)

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message)
        }

        return data

    } catch (error) {
        return error
    }
}

export const CreateAppointment = async (token, appointmentData) => {

    const clientData = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData)
    };

    try {
        const response = await fetch(`${root}appointments`, clientData)

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message)
        }

        return data

    } catch (error) {
        return error
    }
}

export const GetMyAppointments = async (token) => {
    const clientData = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${root}appointments`, clientData)


        const data = await response.json();


        if (!data.success) {
            throw new Error(data.message)
        }

        return data

    } catch (error) {
        return error
    }
}

export const DeleteAppointmentById = async (tokenData, id) => {
    const clientData = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenData?.token}`
        }
    }

    try {
        const response = await fetch(`${root}appointments/${id}`, clientData)


        const data = await response.json();


        if (!data.success) {
            throw new Error(data.message)
        }

        return data

    } catch (error) {
        return error
    }
}

export const GetUsers = async (token) => {

    const clientData = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    }

    try {
        const response = await fetch(`${root}users`, clientData)


        const data = await response.json();


        if (!data.success) {
            throw new Error(data.message)
        }

        return data

    } catch (error) {
        return error
    }
}
export const DeleteUserBySuperAdmin = async (tokenData, id) => {
    const clientData = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenData?.token}`
        }
    }

    try {
        const response = await fetch(`${root}users/${id}`, clientData)


        const data = await response.json();


        if (!data.success) {
            throw new Error(data.message)
        }

        return data

    } catch (error) {
        return error
    }
}