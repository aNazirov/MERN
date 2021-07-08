import { SNACK_MSG } from "./actionTypes";

export function snack(msg = null, isOpen = true) {
    return {
        type: SNACK_MSG,
        isOpen, msg
    }
}