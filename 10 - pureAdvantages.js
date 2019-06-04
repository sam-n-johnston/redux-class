// Possible to compose & combine reducers (since they're pure)

const incAndDecReducer = (state = { counter: 0 }, action) => {
    if(action.type === 'INCREMENT') return { counter: state.counter + 1 }
    if(action.type === 'DECREMENT') return { counter: state.counter - 1 }

    return state
}

// How long the user has been on the app
const timeReducer = (state = 0, action) => {
    if(action.type === 'INCREMENT_TIME') return state + 1

    return state
}

const combineReducers = (reducers) => { // reducers: { incAndDecReducer: Function, timeReducer: Function }
    return (state = {}, action) => { // return a reducer
        const keys = Object.keys(reducers);
        const nextState = {}

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const reducer = reducers[key]
            const previousStateForKey = state[key]
            const nextStateForKey = reducer(previousStateForKey, action)
            nextState[key] = nextStateForKey
        }

        return nextState
    }
}



// How we can create memoized selectors (since they're pure)

// Show some sweet debug features (hot reloading, time travel, record user sessions in case of error, )

// Show state persistence, optimistic mutations (re-calculate the state if you remove 1 action), 
