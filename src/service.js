import axios from "axios"

export const getAllProducts = () => {
    return axios.get(`http://localhost:3005/products`)
}

export const createProduct = (object) => {
    return axios.post(`http://localhost:3005/products`, object)
}
export const deleteProduct = (id) =>{
    return axios.delete(`http://localhost:3005/products/${id}`)
}