import { isAuthenticate } from "../utils/auth";
import instance from "./instance";



export const list = () => {
    const url = `/expense/`;
    return instance.get(url);
}
export const remove = (id: number) => {
    const url = `/expense/${id}`;
    return instance.delete(url);
}
export const add = (product: any, { token, user} = isAuthenticate()) => {
    const url = `/expense/${user._id}`;
    return instance.post(url, product,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}
export const listbyID = (id: number) => {
    const url = `/expense/${id}`;
    return instance.get(url);
}
export const update = (product: any) =>{
    const url = `/expense/${product._id}`;
    return instance.put(url, product)
}