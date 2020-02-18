const initialState={
    books: [
        {
            id: 1,
            title: 'Production-Ready Microservices',
            author: 'Susan Fowler',
        },
        {
            id:2,
            title: 'Release It',
            author: 'Michael Nigard',
        }
    ],
};

const reducer = (state = initialState, action)=>{
    switch (action.type){
        case 'BOOKS_LOADED' :
            return{
                books: action.payload,
            };
        default:
            return state;
    }
};

export  default  reducer;

