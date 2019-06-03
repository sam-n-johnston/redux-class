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

// Pure vs impure function
const square = (x) => x * x

let timer = 0;

const squareIfUnder10 = (x) => {
    if (timer < 10) {
        timer++
        return x * x
    }
    else return x
}

// Reducer to describe state changes
const reducer = (state = { counter: 0 }, action) => {
    if(action.type === 'INCREMENT') return { counter: state.counter + 1 }
    if(action.type === 'DECREMENT') return { counter: state.counter - 1 }

    return state
}

const { createStore } = Redux;
const store = createStore(reducer)

const render = (counterObj) => {
    document.getElementById("renderDiv").innerText = counterObj.counter;
};

const connect = (elementId) => (renderFunc) => () => {
  const currentProps = document.getElementById(elementId).innerText
  if (currentProps !== store.getState()) renderFunc(store.getState())
}


store.subscribe(connect("renderDiv")(render))
render({counter: 0})






