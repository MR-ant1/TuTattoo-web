
const root = "http://localhost:4001/api/"

export const RegisterUser = async (user) => {
    
    const clientData = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    };
    try {

        const response = await fetch(`${root}auth/register`, clientData)

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
            "Content-Type":"application/json",
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
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
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

export const UpdateProfile = async (token, data) => {
    const clientData = {
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
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
            "Content-Type":"application/json",
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