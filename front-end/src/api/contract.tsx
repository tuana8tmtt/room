import { ContractType } from "../pages/types/contract";
import { isAuthenticate } from "../utils/auth";
import instance from "./instance";



export const list = () => {
    const url = `/contracts/`;
    return instance.get(url);
}
export const remove = (id: number) => {
    const url = `/contracts/${id}`;
    return instance.delete(url);
}
export const add = (product: ContractType, { token, user} = isAuthenticate()) => {
    const url = `/contracts/${user._id}`;
    return instance.post(url, product,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}
export const listbyID = (id: number) => {
    const url = `/contracts/${id}`;
    return instance.get(url);
}
export const update = (product: ContractType) =>{
    const url = `/contracts/${product._id}`;
    return instance.put(url, product)
}