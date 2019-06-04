// STATE
const state = {
    counter_1: { internval: 0, count: 0 },
    counter_2: { internval: 0, count: 0 },
};

// ACTION
const increment = {
    type: 'INCREMENT'
}
const decrement = {
    type: 'DECREMENT'
}
const reset = {
    type: 'RESET'
}
const incrementCounter2 = {
    type: 'INCREMENT_COUNTER_2'
}

// REDUCER
const reducer = (state = { counter_1: { internval: 0, count: 0 }, counter_2: { internval: 0, count: 0 } }, action) => {
    if(action.type === 'INCREMENT') return {
        ...state,
        counter_1: { ...state.counter_1, count: state.counter_1.count + 1 },
    }
    if(action.type === 'DECREMENT') return {
        ...state,
        counter_1: { ...state.counter_1, count: state.counter_1.count - 1 },
    }
    if(action.type === 'RESET') {
        state.counter_1.count = 0
        return state
     } 
    if(action.type === 'INCREMENT_COUNTER_2') return {
        ...state,
        counter_2: { ...state.counter_2, count: state.counter_2.count + 1 },
    }

    return state
}

const { createStore } = Redux;
const store = createStore(reducer)

const render = (props) => {
    document.getElementById("renderDiv").innerText = JSON.stringify(props);
};

const connect = (mapStateToProps) => (renderFunc) => {
    let currentProps = {}
    return () => {
        if (currentProps === mapStateToProps(store.getState())) {
            console.log('STATE DID NOT CHANGE')
            return
        }

        currentProps = mapStateToProps(store.getState())
        render(currentProps)
    }
}

const mapStateToProps = (state) => state.counter_1
store.subscribe(connect(mapStateToProps)(render))
render(mapStateToProps(store.getState()))

// HTML 


{/* <div>
  <div id="renderDiv" >
  </div>
  <div id="buttonDiv" >
    <input type="button" onclick="store.dispatch(increment); return false" value="+" />
    <input type="button" onclick="store.dispatch(decrement); return false" value="-" />
    <input type="button" onclick="store.dispatch(incrementCounter2); return false" value="incrementCounter2" />
    <input type="button" onclick="store.dispatch(reset); return false" value="reset" />
  </div>
</div> */}




