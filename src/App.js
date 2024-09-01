import './App.css';
import { useReducer } from 'react';

const actions = {
  add_digit: 'add-digit',
  choose_operation: 'choose-operation',
  clear: 'clear',
  delete_digit: 'delete-digit',
  evaluate: 'evaluate'
}

const initialState = {
  currentOperant: '',
  previousOperant: '',
  operation: ''
}

function reducer(state, {type, payload}) {
  switch(type) {
    case actions.add_digit:
      return {
        ...state,
        currentOperant: `${state.currentOperant}${payload.digit}`
      }
    case actions.choose_operation:
      return {
        ...state,
        operation: payload.operation,
        previousOperant: state.currentOperant,
        currentOperant: ''
      }
    case actions.clear:
      return initialState
    case actions.delete_digit:
      return {
        ...state,
        currentOperant: state.currentOperant.slice(0, -1)
      }
    case actions.evaluate:
      const result = eval(`${state.previousOperant} ${state.operation} ${state.currentOperant}`)
      return {
        ...state,
        currentOperant: result.toString(),
        previousOperant: '',
        operation: ''
      }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operant">{state.previousOperant} {state.operation}</div>
        <div className="current-operant">{state.currentOperant}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: actions.clear })}>Clear All</button>
      <button onClick={() => dispatch({ type: actions.delete_digit })}>DEL</button>
      <button onClick={() => dispatch({ type: actions.choose_operation, payload: { operation: '/' } })}>/</button>
      <button onClick={() => dispatch({ type: actions.add_digit, payload: { digit: '1' } })}>1</button>
      <button onClick={() => dispatch({ type: actions.add_digit, payload: { digit: '2' } })}>2</button>
      <button onClick={() => dispatch({ type: actions.add_digit, payload: { digit: '3' } })}>3</button>
      <button onClick={() => dispatch({ type: actions.choose_operation, payload: { operation: '*' } })}>*</button>

      <button onClick={() => dispatch({ type: actions.add_digit, payload: { digit: '4' } })}>4</button>
      <button onClick={() => dispatch({ type: actions.add_digit, payload: { digit: '5' } })}>5</button>
      <button onClick={() => dispatch({ type: actions.add_digit, payload: { digit: '6' } })}>6</button>
      <button onClick={() => dispatch({ type: actions.choose_operation, payload: { operation: '+' } })}>+</button>

      <button onClick={() => dispatch({ type: actions.add_digit, payload: { digit: '7' } })}>7</button>
      <button onClick={() => dispatch({ type: actions.add_digit, payload: { digit: '8' } })}>8</button>
      <button onClick={() => dispatch({ type: actions.add_digit, payload: { digit: '9' } })}>9</button>
      <button onClick={() => dispatch({ type: actions.choose_operation, payload: { operation: '-' } })}>-</button>

      <button onClick={() => dispatch({ type: actions.add_digit, payload: { digit: '.' } })}>.</button>
      <button onClick={() => dispatch({ type: actions.add_digit, payload: { digit: '0' } })}>0</button>
      <button className="span-two" onClick={() => dispatch({ type: actions.evaluate })}>=</button>
    </div>
  );
}

export default App;