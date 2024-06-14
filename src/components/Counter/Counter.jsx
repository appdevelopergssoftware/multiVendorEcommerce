import React from 'react';
import './Counter.css';

const Counter = ({counter}) => {
  return (
    <span className='counter'>{counter}</span>
  )
}

export default Counter