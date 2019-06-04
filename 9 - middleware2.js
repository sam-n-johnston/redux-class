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

// Reducer to describe state changes
const reducer = (state = { counter: 0 }, action) => {
    if(action.type === 'INCREMENT') return { counter: state.counter + 1 }
    if(action.type === 'DECREMENT') return { counter: state.counter - 1 }

    return state
}

const { createStore } = Redux;
const logger = store => next => action => {
    console.log(action, '=>' ,store.getState())
}

const historyLog = {}

const history = store => next => action => {
    historyLog[Date.now()] = {
        action,
        previousState: store.getState()
    }
    console.log(historyLog)
}

const store = createStore(reducer, [history, logger])

const render = () => {
    consoloe
    document.getElementById("renderDiv").innerHTML = `
    <div> 
      ${store.getState().counter} 
    </div>
    `;
};

store.subscribe(render)
render()





