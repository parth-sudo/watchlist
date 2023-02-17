import {createStore, combineReducers} from 'redux';

let defaultState = [{name : "cc", watched : false}]

const reducerFoo = (state = defaultState, action) => {
    if(action.type === 'fetchDataForInitialState') {
        let curState = [...state];
        const items = action.allItems;
    
        curState = items;
        console.log("Initial Current State->>>");
        curState.forEach((item) => {
            console.log(item.name);
        })
    
        return curState; 
    }
    else if(action.type === 'addShowToList') {
        let curState = [...state];
        let obj = action.showObject;
        curState.push(obj);
    
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
        let idx = curState.findIndex((obj) => obj.deviceId === action.deviceId && obj.title === action.title);
        if(idx >= 0) curState[idx].watched = true;
        
        return curState;
    }

    return state;
}

const store = createStore(reducerFoo);

export default store;