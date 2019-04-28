"use strict"
export function booksReducers (state={books:[
    { _id : 1, 
        title:'this is the first title', 
        description: 'this is the first description',
        price: 35.88,
    },
    { _id : 2, 
        title:'this is the second title', 
        description: 'this is the second description',
        price: 66.18
    }
]},action) {
    switch(action.type) {
        case 'GET_BOOK': 
            return {...state, books:[...state.books]}

        case 'POST_BOOK':
            return { books: [...state.books, ...action.payload]}

        case 'DELETE_BOOK':
            const currentBookToDelete = [...state.books]
            const indexToDelete = currentBookToDelete.findIndex (
                 book => {
                    return book._id == action.payload
                }
            )
            return { books: [...currentBookToDelete.slice(0,indexToDelete), ...currentBookToDelete.slice(indexToDelete+1)]}

        case 'UPDATE_BOOK': 
            const currentBookToUpdate = [...state.books]
            const indexToUpdate = currentBookToUpdate.findIndex (book => {
                return book._id === action.payload._id
            })
            const ourNewBook = {
                ...currentBookToUpdate[indexToUpdate], title: action.payload.title
            }
            
            return { books: [...currentBookToUpdate.slice(0,indexToUpdate), ourNewBook, ...currentBookToUpdate.slice(indexToUpdate+1)] }
    }
    return state
}