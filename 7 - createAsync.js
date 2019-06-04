// HTML

/* <div>
  <div id="renderDiv" >   
  </div>
  <div id="buttonDiv" > 
    <input type="button" onclick="store.dispatch(increment); return false" value="+" /> 
    <input type="button" onclick="store.dispatch(decrement); return false" value="-" /> 
  </div>
</div> */


// JS

const increment = (dispatch, getState) => {
    setTimeout(() => dispatch({ type: 'INCREMENT' }), 2000)
}
const decrement = {
    type: 'DECREMENT'
}

// Reducer to describe state changes
const reducer = (state = { counter: 0 }, action) => {
    if(action.type === 'INCREMENT') return { counter: state.counter + 1 }
    if(action.type === 'DECREMENT') return { counter: state.counter - 1 }

    return state
}

// With redux
const createStore = (reducer) => {
    let state = reducer(undefined, {});
    const listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener);
    }

    const dispatch = (action) => {
        if (typeof action === 'function') return action(dispatch, getState)

        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    return { getState, subscribe, dispatch }
}

const store = createStore(reducer)

const render = () => {
    document.getElementById("renderDiv").innerHTML = `
    <div> 
      ${store.getState().counter} 
    </div>
    `;
};

store.subscribe(render)
render()
