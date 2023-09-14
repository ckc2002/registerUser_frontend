import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000",
})

API.interceptors.request.use((req) => {
    req.headers["Content-Type"] = "application/json"
    return req
})

export const AllUser = () => API.get("api/user/")
export const RegisterUser = (data) => API.post("api/user/register", data)
export const SingleUserData = (id) => API.get(`api/user/${id}`)
export const DeleteUser = (id) => API.delete(`api/user/${id}`)
export const UpdateUserData = (id, data) => API.put(`api/user/edit/${id}`, data)

export const AllCountry = () => API.get("api/country/")
export const AddCountry = (data) => API.post("api/country/add", data)
export const SingleCountry = (id) => API.get(`api/country/${id}`)
export const UpdateCountry = (id, data) => API.put(`api/country/edit/${id}`, data)
export const DeleteCountry = (id) => API.delete(`api/country/${id}`)