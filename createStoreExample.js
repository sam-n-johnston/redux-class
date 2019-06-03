// state is read-only immutable
const state = {
    counter: 10,
};

// state can only be changed by action (similarity to CQRS)
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

// Create `createStore` function
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


// Create async usage

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

// Create async usage with middlewares (+logging)

const createStore = (reducer, middlewares) => {
    let state = reducer(undefined, {});
    const listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener);
    }

    const dispatch = (action) => {
        middlewares.reduce((funcs, middleware) => (...args) => funcs(middleware(...args))) // To finish (check 14:00 of Dan's video)

        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    return { getState, subscribe, dispatch }
}


// Example of composable reducers (since they're pure)


// How we can create memoized selectors (since they're pure)


// Show conditional listener call (only call if change in object)

// How the constraints makes contracts social, (17:22 in video). That means you can compose API extensions. 

// Show some sweet debug features (hot reloading, time travel, record user sessions in case of error, )

// Enhancers? (15:26 in Dan's video)


// Show undo/redo (11:31 in Dan's video) Higher order reducer (takes a reducer + args & sends another reducer). Or check Dan's old video (2015) at 23:21

// Show state persistence, optimistic mutations (re-calculate the state if you remove 1 action), 



// Talk about boiler plate


// ============================


<div>
  <div id="renderDiv" >   
  </div>
  <div id="buttonDiv" > 
    <input type="button" onclick="store.dispatch(increment); return false" value="+" /> 
    <input type="button" onclick="store.dispatch(decrement); return false" value="-" /> 
  </div>
</div>


// ============================


// Talk from Abramove

/* Redux has almost no API or features. It's not popular because of this. It's popular because of the constraints it puts on us. 
 * https://www.youtube.com/watch?v=uvAXVMwHJXU&t=536s
 * Some constraints provide features. 
 * Easy to understand what's happening in the library
 * Social contracts makes it popular 
 * /






