"strict"

export function cartReducers( state = { cart : [] }, action ) {
    switch(action.type) {
        case "ADD_TO_CART":
            return { ...state.cart, 
                    cart:action.payload, 
                    totalAmount: totals(action.payload).amount,
                    totalQty: totals(action.payload).qty
                }

        case "DELETE_CART_ITEM":
            return { ...state.cart, 
                cart:action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).qty
            }

        case "UPDATE_CART":
            const currentCartToUpdate = [...state.cart]

            const indexToUpdate = currentCartToUpdate.findIndex (cart => {
                return cart._id === action._id
            })
            const ourNewCart = {
                ...currentCartToUpdate[indexToUpdate], quantity: currentCartToUpdate[indexToUpdate].quantity + action.unit
            }
             
            let cartUpadte = [...currentCartToUpdate.slice(0,indexToUpdate), ourNewCart, ...currentCartToUpdate.slice(indexToUpdate+1)]

            return {...state, 
                    cart:cartUpadte, 
                    totalAmount: totals(cartUpadte).amount,
                    totalQty: totals(cartUpadte).qty
                }
    }
    return state
}


export function totals(payloadArr) {

    const totalAmount = payloadArr.map((cartArr) => {
        return cartArr.price * cartArr.quantity
    }).reduce((a,c) => {
        return a+c
    },0)


    const totalQty = payloadArr.map( qty =>  {
        return qty.quantity
    }).reduce((a,c) => {
        return a+c
    },0)

    return {amount: totalAmount.toFixed(2), qty:totalQty}

}