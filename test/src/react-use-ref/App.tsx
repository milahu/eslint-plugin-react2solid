import React from 'react';

export default function App(props) {
  const divRef = React.useRef<HTMLDivElement>(null)
  const
    ref2 = React.useRef(2),
    ref3 = React.useRef(3),
    noref = "norefValue";
  const
    ref4 = React.useRef(4),
    ref5 = React.useRef(5);
  const [counter1, setCounter1] = React.useState(props.init1 || 0)
  const [counter2, setCounter2] = React.useState(props.init2 || 0)
  const increment1 = () => setCounter1(counter1 + 1)
  const increment2 = () => setCounter2(counter2 + 1)
  const colors = ["red", "yellow", "green", "blue"]
  const [colorId, setColorId] = React.useState(0)
  React.useEffect(() => {
    const div = divRef.current
    if (div) {
      setColorId((colorId + 1) % 3)
      div.style.color = colors[colorId]
    }
  }, [counter1])
  return (
    <div
      ref={divRef}
      style={{ color: "white", background: "black", width: "80vw", userSelect: "none" }}
    >
      <h2>App</h2>
      <div onClick={increment1}>counter1 = {counter1} (click me)</div>
      <div onClick={increment2}>counter2 = {counter2} (click me)</div>
      <div>ref2.current = {ref2.current}</div>
      <div>ref3.current = {ref3.current}</div>
      <div>noref = {noref}</div>
      <div>ref4.current = {ref4.current}</div>
      <div>ref5.current = {ref5.current}</div>
    </div>
  )
}
