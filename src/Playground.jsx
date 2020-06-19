import React, { useState, useRef, useCallback } from 'react'
import randomColor from 'randomcolor'

export default function Playground() {

  const [count, setCount] = useState(30);


  const [colour, setColour] = useState(randomColor());

  const calculate = useCallback(<Calculate />, [count])
  return (
    <div style={{ borderTop: `10px solid ${colour}` }}>
      {count}
      <button onClick={() => setCount(currentCount => currentCount - 1)}>-</button>
      <button onClick={() => setCount(currentCount => currentCount + 1)}>+</button>
      <button onClick={() => setColour(randomColor())}>Change Colour</button>
      <hr />
      <input type="range" onChange={e => setCount(e.target.value)} value={count} />
      {calculate}
    </div>)
}

function Calculate() {
  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;
  return <div>{renderCount.current}</div>;
}