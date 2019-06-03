// state is read-only immutable
const state = {
    counter: 10,
};

// state can only be changed by action
dispatch({
    type: 'INCREMENT'
})

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

// Create basic redux usage example 
expect(
    reducer({ counter: 0 }, { type: 'INCREMENT' })
).toEqual({ counter: 1 })
expect(
    reducer({ counter: 1 }, { type: 'INCREMENT' })
).toEqual({ counter: 2 })
expect(
    reducer({ counter: 0 }, { type: 'DECREMENT' })
).toEqual({ counter: -1 })
expect(
    reducer({ counter: 1 }, { type: 'DECREMENT' })
).toEqual({ counter: 0 })
expect(
    reducer(undefined, { type: 'INCREMENT' })
).toEqual({ counter: 1 })

console.log('TESTS PASSED')

// With redux
const { createStore } = Redux;
const store = createStore(reducer)

console.log(store.getState())
store.dispatch({
    type: 'INCREMENT'
})
console.log(store.getState())

const render = () => {
    document.body.innerHTML = `
    <div>
    	${store.getState().counter}
    </div>
    `
}

store.subscribe(render)
render()

document.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' })
})


// Create `createStore` function
const createStore = (reducer) => {
    let state;
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


// Create async usage



// Show conditional listener call (only call if change in object)


// Show some sweet debug features




// Show undo/redo

// Show state persistence



// Talk about boiler plate


