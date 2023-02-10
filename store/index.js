import {createStore} from 'redux';

let defaultState = []

const reducerFoo = (state = defaultState, action) => {
    if(action.type === 'fetchDataForInitialState') {
        let curState = [...state];
        const items = action.allItems;
    
        curState = items;
        // console.log("Current State->>>", curState);
    
        return curState;
    }
    else if(action.type === 'deleteShowFromWatchedList') {
        let curState = [...state];
        const idx = curState.findIndex((obj) => obj.id === action.id); 
        curState.splice(idx, 1);
 
        return curState;
    }
    else if(action.type === 'updateWatchedItems') {
        let curState = [...state];
        // todo.
        let idx = curState.findIndex((obj) => obj.deviceId === action.deviceId);
        if(idx >= 0) curState[idx].watched = true;
        
        // console.log( "line 22:: ", curState);
        
        return curState;
    }
    else if(action.type === 'addShowToList') {
        let curState = [...state];
        let obj = action.showObject;
        curState.push(obj);
        console.log("In index.js, Action.type == addShowToList::::::", curState);
        return curState;
    }

    return state;
}

const store = createStore(reducerFoo);

export default store;