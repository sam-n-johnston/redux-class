const state = {
    counter: 10,
};
const increment = {
    type: 'INCREMENT'
}
const decrement = {
    type: 'DECREMENT'
}
const reducer = (state = { counter: 0 }, action) => {
    if(state.counter > 10) throw new Error('BOOM')
    if(action.type === 'INCREMENT') return { counter: state.counter + 1 }
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

const store = createStore(reducer, applyMiddleware(crashReporter, history, logger))

const render = () => {
    document.getElementById("renderDiv").innerHTML = `
    <div> 
      ${store.getState().counter} 
    </div>
    `;
};

store.subscribe(render)
render()



