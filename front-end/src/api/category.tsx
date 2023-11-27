import { CateType } from "../pages/types/category";
// import { isAuthenticate } from "../utils/localstorage";
import instance from "./instance";

// const { token, user} = isAuthenticate();

export const listcate = () => {
    const url = `/category`;
    return instance.get(url);
}
export const remove = (id: number) => {
    const url = `/category/${id}`;
    return instance.delete(url);
}
export const add = (cate: CateType) => {
    const url = `/category/`;
    return instance.post(url, cate);
}
export const listbyIDCate = (id: number) => {
    const url = `/category/${id}`;
    return instance.get(url);
}
export const listbyIDcategory = (id: number) => {
    const url = `/category/get/${id}`;
    return instance.get(url);
}
export const update = (cate: CateType) =>{
    const url = `/category/${cate._id}`;
    return instance.put(url, cate)
}