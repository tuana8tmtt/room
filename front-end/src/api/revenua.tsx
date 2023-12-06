import { isAuthenticate } from "../utils/auth";
import instance from "./instance";



export const listrevenue = () => {
    const url = `/revenue/`;
    return instance.get(url);
}
export const removerevenue = (id: number) => {
    const url = `/revenue/${id}`;
    return instance.delete(url);
}
export const addrevenue = (product: any, { token, user} = isAuthenticate()) => {
    const url = `/revenue/${user._id}`;
    return instance.post(url, product,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}
export const listbyIDrevenue = (id: number) => {
    const url = `/revenue/${id}`;
    return instance.get(url);
}
export const updaterevenue = (product: any) =>{
    const url = `/revenue/${product._id}`;
    return instance.put(url, product)
}