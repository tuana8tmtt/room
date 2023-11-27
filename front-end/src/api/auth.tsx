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

export const checkPassword = (data: { _id: string, password: string} ) => {
    const url = `/checkPassword`;
    return instance.post(url, data);
}