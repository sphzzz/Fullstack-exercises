import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import counterReducer from './reducer';

// 创建 Redux store
const store = createStore(counterReducer);

const App = () => {
  const dispatch = useDispatch();
  const feedback = useSelector(state => state);

  return (
    <div>
      
      <div>
        <button onClick={() => dispatch({ type: 'GOOD' })}>good</button>
        <button onClick={() => dispatch({ type: 'OK' })}>ok</button>
        <button onClick={() => dispatch({ type: 'BAD' })}>bad</button>
        <button onClick={() => dispatch({ type: 'ZERO' })}>reset stats</button>
      </div>
      <div>
        <p>good: {feedback.good}</p>
        <p>ok: {feedback.ok}</p>
        <p>bad: {feedback.bad}</p>
      </div>
    </div>
  );
};


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);