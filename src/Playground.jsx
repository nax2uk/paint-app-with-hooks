import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import randomColor from 'randomcolor'

export default function Playground() {

  const [count, setCount] = useState(0);

  const [colour, setColour] = useState(null);
  useEffect(() => {
    setColour(randomColor())
  }, [count]);

  return (
    <div style={{ borderTop: `10px solid ${colour}` }}>
      {count}
      <button onClick={() => setCount(currentCount => currentCount + 1)}>+</button>
      <button onClick={() => setCount(currentCount => currentCount - 1)}>-</button>
    </div>)
}