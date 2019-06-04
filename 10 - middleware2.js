const state = {
    counter: 10,
};
// const increment = dispatch => {
//     dispatch({ type: 'SENDING_REQUEST' })
//     return new Promise(resolve => setTimeout(resolve, 2000))
//         .then(() => dispatch({ type: 'INCREMENT' }))
//         .catch(() => dispatch({ type: 'REQUEST_FAILED' }))
// }
const increment = {
    type: 'FETCH_INCREMENT',
    payload: {
        endpoint: 'https://httpbin.org/ip'
    }
}
const decrement = {
    type: 'DECREMENT'
}
const reducer = (state = { counter: 0 }, action) => {
    if(state.counter > 10) throw new Error('BOOM')
    if(action.type === 'FETCH_INCREMENT_SUCCESS') return { counter: state.counter + 1 }
    if(action.type === 'DECREMENT') return { counter: state.counter - 1 }

    return state
}

const { createStore, applyMiddleware } = Redux;
const logger = store => next => action => {
    console.log(action, '=>' ,store.getState())
    return next(action)
}

const historyLog = {}

const history = store => next => action => {
    historyLog[Date.now()] = {
        action,
        previousState: store.getState()
    }
    return next(action)
}

const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    // Log to ELK
    console.log(historyLog)
    throw err
  }
}

const fetchFromServer = store => next => action => {
    if (action.payload && action.payload.endpoint){
        store.dispatch({ type: `${action.type}_REQUEST` })
        fetch(action.payload.endpoint)
            .then((res) => store.dispatch({ type: `${action.type}_SUCCESS`, payload: res }))
            .catch((err) => store.dispatch({ type: `${action.type}_FAILURE`, payload: err }))
    }
    return next(action)
}


const thunk = store => next => action => {
    if (typeof action === 'function') return action(store.dispatch, store.getState)
    return next(action)
}

const store = createStore(reducer, applyMiddleware(crashReporter, history, logger, thunk, fetchFromServer))

const render = () => {
    document.getElementById("renderDiv").innerHTML = `
    <div> 
      ${store.getState().counter} 
    </div>
    `;
};

store.subscribe(render)
render()



