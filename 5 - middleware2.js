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

const createStore = (reducer, middlewares = []) => {
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

const logger = store => action => {
    console.log(action, '=>' ,store.getState())
}

const historyLog = {}

const history = store => action => {
    historyLog[Date.now()] = {
        action,
        previousState: store.getState()
    }
    console.log(historyLog)
}

const actionCatcher = store => action => {
    
}

const store = createStore(reducer, [history, logger])

const render = () => {
    document.getElementById("renderDiv").innerHTML = `
    <div> 
      ${store.getState().counter} 
    </div>
    `;
};

store.subscribe(render)
render()





