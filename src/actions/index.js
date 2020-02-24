const booksRequested = ()=>{
    return {
        type: 'FETCH_BOOKS_REQUEST',
    }
};
const booksLoaded=(newBooks)=>{
    return {
        type: 'FETCH_BOOKS_SUCCESS',
        payload: newBooks,
    }
};

const booksError = (error)=>{
    return {
        type:'FETCH_BOOKS_FAILURE',
        payload: error,
    };
};

const fetchBooks= (bookstoreService, dispatch)=>()=>{
    dispatch(booksRequested());
    bookstoreService.getBooks()
        .then((data)=>dispatch(booksLoaded(data)))
        .catch((err)=>dispatch(booksError(err)));
};

const bookAddedToCart=(bookId)=>{
    return {
        type: 'BOOK_ADDED_TO_CART',
        payload: bookId,
    }
};

const bookIncreaseInCart=(bookId)=>{
   return {
       type: 'BOOK_ADDED_TO_CART',
       payload: bookId,
   }
};

const bookDecreaseInCart = (bookId)=>{
   return {
       type: 'BOOK_DEC_IN_CART',
       payload: bookId,
   }
};
const bookDelInCart= (bookId)=>{
    return {
        type: 'BOOK_DEL_IN_CART',
        payload: bookId,
    }
};

export {
    fetchBooks,
    bookAddedToCart,
    bookIncreaseInCart,
    bookDecreaseInCart,
    bookDelInCart,
};