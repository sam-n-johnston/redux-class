// https://unpkg.com/expect@1.20.2/umd/expect.min.js
// https://cdnjs.cloudflare.com/ajax/libs/redux/3.1.4/redux.js

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

// Reducer is a pur function to describe state changes
const reducer = (state = { counter: 0 }, action) => {
    if(action.type === 'INCREMENT') return { counter: state.counter + 1 }
    if(action.type === 'DECREMENT') return { counter: state.counter - 1 }

    return state
}

// Easy to test
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