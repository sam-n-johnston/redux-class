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
    if(action.type === 'INCREMENT') return { counter: state.counter + 1 }
    if(action.type === 'DECREMENT') return { counter: state.counter - 1 }

    return state
}

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


// HTML

<div>
  <div id="renderDiv" >   
  </div>
  <div id="buttonDiv" > 
    <input type="button" onclick="store.dispatch(increment); return false" value="+" /> 
    <input type="button" onclick="store.dispatch(decrement); return false" value="-" /> 
  </div>
</div>

