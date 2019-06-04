const state = {
    counter: 10,
};
const increment = dispatch => {
    dispatch({ type: 'SENDING_REQUEST' })
    return new Promise(resolve => setTimeout(resolve, 2000))
        .then(() => dispatch({ type: 'INCREMENT' }))
        .catch(() => dispatch({ type: 'REQUEST_FAILED' }))
}
const decrement = {
    type: 'DECREMENT'
}
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

const thunk = store => action => {
    if (typeof action === 'function') return action(store.dispatch, store.getState)
}

const store = createStore(reducer, [logger, thunk])

const render = () => {
    document.getElementById("renderDiv").innerHTML = `
    <div> 
      ${store.getState().counter} 
    </div>
    `;
};

store.subscribe(render)
render()





