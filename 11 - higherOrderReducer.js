// Show undo/redo (11:31 in Dan's video) Higher order reducer (takes a reducer + args & sends another reducer). Or check Dan's old video (2015) at 23:21
const state = {
    counter: 10,
};
const increment = {
    type: 'INCREMENT'
}
const decrement = {
    type: 'DECREMENT'
}
const undo = {
    type: 'UNDO'
}

// Reducer to describe state changes
const reducer = (state = { counter: 0 }, action) => {
    if(action.type === 'INCREMENT') return { counter: state.counter + 1 }
    if(action.type === 'DECREMENT') return { counter: state.counter - 1 }

    return state
}

const undoable = (reducer) => {
    const initialState = {
        past: [],
        present: reducer(undefined, {})
    }
    return (state = initialState, action) => {
        const { past, present } = state;
        if (action.type === 'UNDO') {
            return {
                past: past.slice(0, -1),
                present: past[past.length - 1]
            };
        }
        return {
            past: [...past, present],
            present: reducer(present, action)
        }
    }
}
// redux-undo, redux-optimistic-ui, react-redux-form

const createStore = (reducer) => {
    let state = reducer(undefined, {});
    const listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener);
    }

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
        console.log('DISPATCHED')
        console.log(action)
        console.log(state)
    }

    return { getState, subscribe, dispatch }
}

const store = createStore(undoable(reducer))

const render = () => {
    document.getElementById("renderDiv").innerHTML = `
    <div> 
      ${store.getState().present.counter} 
    </div>
    `;
};

store.subscribe(render)
render()

// HTML

<div>
  <div id="renderDiv" >
  </div>
  <div id="buttonDiv" >
    <input type="button" onclick="store.dispatch(increment); return false" value="+" />
    <input type="button" onclick="store.dispatch(decrement); return false" value="-" />
    <input type="button" onclick="store.dispatch(undo); return false" value="undo" />
  </div>
</div>




