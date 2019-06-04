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

// Create `createStore` function
const createStore = (reducer) => {
    let state = reducer(undefined, { type: "@@INIT" });
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

const increment = (dispatch, getState) => {
    setTimeout(() => dispatch({ type: 'INCREMENT' }), 2000)
}

// Create async usage with single middleware
const createStore = (reducer, middlewares) => {
    let state = reducer(undefined, {});
    const listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener);
    }

    const dispatch = (action) => {
        middlewares.map((middleware) => {
            middleware(store)(action)
        })

        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    return { getState, subscribe, dispatch }
}



const createStore = (reducer, middlewares) => {
    let state = reducer(undefined, {});
    const listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener);
    }

    const dispatch = (action) => {
        middlewares.reduce((funcs, middleware) => (...args) => funcs(middleware(...args)))

        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    return { getState, subscribe, dispatch }
}



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






// How the constraints makes contracts social, (17:22 in video). That means you can compose API extensions. 

// Enhancers? (15:26 in Dan's video)



