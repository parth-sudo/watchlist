import {createStore} from 'redux';

let defaultState = [
    {
        category : 'Anime', 
        items : [{name : 'DBZ'}]
    },
    {
        category : 'TV Shows', 
        items : [{}]
    },
    {
        category : 'Movies', 
        items : [{}]
    }
]

const reducerFoo = (state = defaultState, action) => {
    if(action.type === 'addItem') {
        return state;
    }
    else if(action.type === 'deleteItem') {
        state;
    }

    return state;
}

const store = createStore(reducerFoo);

export default store;