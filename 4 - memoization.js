// How we can create memoized selectors (since they're pure), for ordering, filtering, etc.
// 
// state is immutable & a JS object
const state = {
    counter: 10,
};

// state can only be changed by an action & a JS object
const increment = {
    type: 'INCREMENT'
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

const mySelector = (state) => {
    console.log('heavy computation')
    return state.counter * Math.cos(state.counter)
} 

let memoizedValue = undefined
let memoizedArgs = undefined
const myMemoizor = (selector) => (...args) => {
    if (memoizedValue !== undefined && JSON.stringify(memoizedArgs) === JSON.stringify(args)) return memoizedValue
    memoizedArgs = args
    memoizedValue = selector(...args)

    return memoizedValue
}

const memoizedSelector = myMemoizor(mySelector)


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
    }

    return { getState, subscribe, dispatch }
}

const store = createStore(reducer)

const render = () => {
    console.log('render')
    document.getElementById("renderDiv").innerHTML = `
    <div> 
      ${memoizedSelector(store.getState())}
    </div>
    `;
};

store.subscribe(render)
render()

setInterval(() => {
    console.log('dispatching tick')
    store.dispatch({ TYPE: 'TICK' })
}, 1000)

// HTML

/* <div>
  <div id="renderDiv" >   
  </div>
  <div id="buttonDiv" > 
    <input type="button" onclick="store.dispatch(increment); return false" value="+" /> 
    <input type="button" onclick="store.dispatch(decrement); return false" value="-" /> 
  </div>
</div> */




