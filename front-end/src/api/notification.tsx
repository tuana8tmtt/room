import { isAuthenticate } from "../utils/auth";
import instance from "./instance";



export const list = () => {
    const url = `/notification/`;
    return instance.get(url);
}
export const remove = (id: number) => {
    const url = `/notification/${id}`;
    return instance.delete(url);
}
export const add = (product: any, { token, user} = isAuthenticate()) => {
    const url = `/notification/${user._id}`;
    return instance.post(url, product,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}
export const listbyID = (id: number) => {
    const url = `/notification/${id}`;
    return instance.get(url);
}
export const update = (product: any) =>{
    const url = `/notification/${product._id}`;
    return instance.put(url, product)
}