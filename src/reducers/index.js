const initialState={
    books: [],
    loading: true,
    error: null,
    cartItems: [],
    orderTotal: 0,
};

const updateCartItems=(cartItems, item, idx)=>{
    if(idx===-1) {
        return [
            ...cartItems,
            item
        ];
    }
    return [
        ...cartItems.slice(0,idx),
        item,
        ...cartItems.slice(idx +1)
    ];
};
const updateCartItem =(book, item)=>{
    let newItem;
    if(item){
        return {
            ...item,
            count: item.count+1,
            total: item.total + book.price,
        };
    } else {
        return {
            id: book.id,
            title: book.title,
            count: 1,
            total: book.price,
        };
    }
};

const reducer = (state = initialState, action)=>{
    switch (action.type){
        case 'FETCH_BOOKS_REQUEST':
            return {
                ...state,
                books: [],
                loading: true,
                error: null,
            };
        case 'FETCH_BOOKS_SUCCESS' :
            return{
                ...state,
                books: action.payload,
                loading: false,
                error: null
            };
        case 'FETCH_BOOKS_FAILURE' :
            return {
                ...state,
                books: [],
                loading: false,
                error: action.payload,
            };
        case 'BOOK_ADDED_TO_CART':
            const bookId=action.payload;
            const book= state.books.find((book)=>book.id===bookId);
            const itemIndex=state.cartItems.findIndex(({id})=>id===bookId);
            const item= state.cartItems[itemIndex];
            const newItem=updateCartItem(book, item);
            return {
                ...state,
               cartItems: updateCartItems(state.cartItems, newItem, itemIndex)
            };
        case 'BOOK_DEC_IN_CART':
            console.log('in reducer dec');
            const arrCart = state.cartItems;
            console.log(arrCart);
            const itemId=action.payload;
            const itemCart= arrCart.find((item)=>item.id===itemId);
            let count= itemCart.count;
            console.log('count is' , count);
            console.log(itemCart);
            let newItemCart={
                ...itemCart,
                count: itemCart.count - 1,
                total: itemCart.total - (itemCart.total / itemCart.count)
            };
            let newArrCart=arrCart.slice();
            let itemIdx=arrCart.findIndex((item)=>item.id===itemId);
            newArrCart.splice(itemIdx, 1, newItemCart);
            console.log(newArrCart);
            if(newItemCart.count===0) {
                newArrCart.splice(itemIdx, 1);
            }
            return {
                ...state,
                cartItems: newArrCart,
            };
        case 'BOOK_DEL_IN_CART':
            const del=()=>{
                const arrCart = state.cartItems;
                const itemId=action.payload;
                const idx= arrCart.findIndex((item)=>item.id===itemId);
                let newArrCart=arrCart.slice();
                newArrCart.splice(idx, 1);
                return {
                    ...state,
                    cartItems: newArrCart,
                };
            };
            return del();

        default:
            return state;
    }
};

export  default  reducer;

