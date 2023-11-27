import { ProductType } from "../pages/types/product";
import { isAuthenticate } from "../utils/auth";
import instance from "./instance";



export const list = () => {
    const url = `/rooms/`;
    return instance.get(url);
}
export const remove = (id: number) => {
    const url = `/rooms/${id}`;
    return instance.delete(url);
}
export const add = (product: ProductType, { token, user} = isAuthenticate()) => {
    const url = `/rooms/${user._id}`;
    return instance.post(url, product,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}
export const listbyID = (id: number) => {
    const url = `/rooms/${id}`;
    return instance.get(url);
}
export const update = (product: ProductType) =>{
    const url = `/rooms/${product._id}`;
    return instance.put(url, product)
}