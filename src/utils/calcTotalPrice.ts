import { CartSlice } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: CartSlice[]) => {
    return items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
    }, 0)
}