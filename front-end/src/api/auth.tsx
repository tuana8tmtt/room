import { UserType } from "../pages/types/user";
import instance from "./instance";

export const signin = (user: { email: string, password: string }) => {
    const url = `/signin`;
    return instance.post(url, user);
}

export const signup = (user: UserType) => {
    const url = `/signup`;
    return instance.post(url, user);
}

export const checkPassword = (data: { _id: string, password: string }) => {
    const url = `/checkPassword`;
    return instance.post(url, data);
}
export const newPasswordUser = (user: any) => {
    const url = `/users/editPass/${user._id}`;
    return instance.patch(url, user);
}
export const editUser = (user: UserType) => {
    const url = `/users/${user._id}`;
    return instance.put(url, user);
}

export const getUserById = (id: any) => {
    const url = `/users/${id}`;
    return instance.get(url);
}
