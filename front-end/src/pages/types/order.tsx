export type OrderType = {
    _id?: number,
    userOrder:{
        name?:string,
        phone?:number,
        address?: string,
        email?:string
    },
    listOrder?:[
        {
            key?:number,
            id?:number,
            image?:string,
            itemTotal?: number,
            price?: number,
            quatity?: number,
            name?:string
        }
    ],
    cartTotal: number,
    status: string,
}