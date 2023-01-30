import {createStore} from 'redux';

let defaultState = [
    {
        category : 'Anime', 
        items : [{name : 'DBZ', watched : false}, {name : 'Pokemon', watched : true}]
    },
    {
        category : 'TV Shows', 
        items : []
    },
    {
        category : 'Movies', 
        items : []
    }
]

const reducerFoo = (state = defaultState, action) => {
    if(action.type === 'addShowToCategory') {
        const curState = [...state];
        const idx = curState.findIndex((obj) => obj.category === action.updatedCategory);
        curState[idx].items = action.updatedItems;
        return curState;
    }
    else if(action.type === 'deleteItem') {
        state;
    }
    else if(action.type === 'updateWatchedItems') {
        const curState = [...state];
        
        let shows = curState.find((obj) => obj.category === action.category).items;
        let showIndex = shows.findIndex((obj) => obj.name === action.name);
        let obj = shows[showIndex];
        console.log(obj);
        obj.watched =  !obj.watched
   
        return curState;
    }

    return state;
}

const store = createStore(reducerFoo);

export default store;