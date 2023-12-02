import { isAuthenticate } from "../utils/auth";
import instance from "./instance";



export const list = () => {
    const url = `/service/`;
    return instance.get(url);
}
export const remove = (id: number) => {
    const url = `/service/${id}`;
    return instance.delete(url);
}
export const add = (product: any, { token, user} = isAuthenticate()) => {
    const url = `/service/${user._id}`;
    return instance.post(url, product,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}
export const listbyID = (id: number) => {
    const url = `/service/${id}`;
    return instance.get(url);
}
export const update = (product: any) =>{
    const url = `/service/${product._id}`;
    return instance.put(url, product)
}