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
const reset = {
    type: 'RESET'
}

// Reducer to describe state changes
const reducer = (state = { counter: 0 }, action) => {
    if(action.type === 'INCREMENT') return { counter: state.counter + 1 }
    if(action.type === 'DECREMENT') return { counter: state.counter - 1 }
    if(action.type === 'RESET') { state.counter = 0 } // TO COMPLETE

    return state
}

const { createStore } = Redux;
const store = createStore(reducer)

const render = (counterObj) => {
    document.getElementById("renderDiv").innerText = JSON.stringify(counterObj);
};

const connect = (elementId) => (renderFunc) => () => {
  const currentProps = document.getElementById(elementId).innerText
  console.log()
  if (currentProps !== store.getState()) renderFunc(store.getState())
}

store.subscribe(connect("renderDiv")(render))
render({counter: 0})

setInterval(() => {
    console.log('dispatching tick')
    store.dispatch({ TYPE: 'TICK' })
}, 1000)





