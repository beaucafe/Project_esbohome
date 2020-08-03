import { createStore, applyMiddleware } from 'redux'

const initialState = {
  counter: 0,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...initialState, counter: initialState.counter + 1 }
    case 'DECREMENT':
      return { ...initialState, counter: initialState.counter - 1 }
    default:
      break
  }
  return state
}

const store = createStore(reducer)

// class store {
//   store: any
//   constructor() {
//     this.store = createStore(reducer)
//     console.log(this.store.getState());

//   }
// }

export { store }
