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

const updateShoppingCart=(state, action)=>{
    if(state===undefined){
        return {
            cartItems: [],
            orderTotal: 0,
        };
    }

    switch (action.type){
        case 'BOOK_ADDED_TO_CART':
            const bookId=action.payload;
            const book= state.bookList.books.find((book)=>book.id===bookId);
            const itemIndex=state.shoppingCart.cartItems.findIndex(({id})=>id===bookId);
            const item= state.shoppingCart.cartItems[itemIndex];
            const newItem=updateCartItem(book, item);
            return {
                cartItems: updateCartItems(state.shoppingCart.cartItems, newItem, itemIndex),
                orderTotal: 0,
            };
        case 'BOOK_DEC_IN_CART':
            const arrCart = state.shoppingCart.cartItems;
            const itemId=action.payload;
            const itemCart= arrCart.find((item)=>item.id===itemId);
            let count= itemCart.count;
            let newItemCart={
                ...itemCart,
                count: itemCart.count - 1,
                total: itemCart.total - (itemCart.total / itemCart.count)
            };
            let newArrCart=arrCart.slice();
            let itemIdx=arrCart.findIndex((item)=>item.id===itemId);
            newArrCart.splice(itemIdx, 1, newItemCart);
            if(newItemCart.count===0) {
                newArrCart.splice(itemIdx, 1);
            }
            return {
                cartItems: newArrCart,
                orderTotal: 0,
            };
        case 'BOOK_DEL_IN_CART':
            const del=()=>{
                const arrCart = state.shoppingCart.cartItems;
                const itemId=action.payload;
                const idx= arrCart.findIndex((item)=>item.id===itemId);
                let newArrCart=arrCart.slice();
                newArrCart.splice(idx, 1);
                return {
                    cartItems: newArrCart,
                    orderTotal: 0,
                };
            };
            return del();
        default:
            return state.shoppingCart;
    }
};

export  default updateShoppingCart;