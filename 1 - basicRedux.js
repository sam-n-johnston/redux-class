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

const render = () => {
    document.getElementById("renderDiv").innerHTML = `
    <div> 
      ${store.getState().counter} 
    </div>
    `;
};

store.subscribe(render)
render()