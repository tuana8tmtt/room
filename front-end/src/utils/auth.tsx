import { CartType } from "../pages/types/cart";

export const isAuthenticate = () => {
    if(!localStorage.getItem('user')) return;
    return JSON.parse(localStorage.getItem('user') as string);
}
const getCart = () => {
    return JSON.parse(localStorage.getItem("cart") as string) || [];
}
export const addToCart = (newProduct: CartType, next: () => void, cart=getCart()) => {
    const existProduct = cart.find((item: { id: string; }) => item.id === newProduct.id);
    if (!existProduct) {
        cart.push(newProduct);
    } else {
        existProduct.quantity += newProduct.quantity;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    next();
}
