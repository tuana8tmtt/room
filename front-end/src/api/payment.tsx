import { isAuthenticate } from "../utils/auth";
import instance from "./instance";



export const list = () => {
    const url = `/payment/`;
    return instance.get(url);
}
export const remove = (id: number) => {
    const url = `/payment/${id}`;
    return instance.delete(url);
}
export const add = (product: any, { token, user} = isAuthenticate()) => {
    const url = `/payment/${user._id}`;
    return instance.post(url, product,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}
export const listbyID = (id: number) => {
    const url = `/payment/${id}`;
    return instance.get(url);
}
export const update = (product: any) =>{
    const url = `/payment/${product._id}`;
    return instance.put(url, product)
}