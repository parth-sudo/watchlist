import {createStore} from 'redux';

let defaultState = []

const reducerFoo = (state = defaultState, action) => {
    if(action.type === 'fetchDataForInitialState') {
        let curState = [...state];
        const items = action.allItems;
        // console.log(items, "line 11 in index.js");
        curState = items;
        // console.log("line 11 index.js:", curState);
        return curState;
    }
    else if(action.type === 'deleteShowFromWatchedList') {
        let curState = [...state];
        const idx = curState.findIndex((obj) => obj.id === action.id); 
        curState.splice(idx, 1);
        console.log("Action type - delete :::::", curState);
        return curState;
    }
    else if(action.type === 'updateWatchedItems') {
        let curState = [...state];
        let idx = curState.findIndex((obj) => obj.name === action.title && obj.category === action.category);
        if(idx >= 0) curState[idx].watched = true;
        
        console.log( "line 22:: ", curState);
        
        return curState;
    }

    return state;
}

const store = createStore(reducerFoo);

export default store;