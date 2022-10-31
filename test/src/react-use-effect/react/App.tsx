/*
https://github.com/BuilderIO/mitosis/issues/857
*/

import React from 'react';

export function App(props) {
  const [counter1, setCounter1] = React.useState(0)
  const [counter2, setCounter2] = React.useState(0)
  const increment1 = () => setCounter1(counter1 + 1)
  const increment2 = () => setCounter2(counter2 + 1)
  const timeFactory = () => Date.now() % 1000
  // time is reactive to counter1
  const [time, setTime] = React.useState(0)
  React.useEffect(() => {
    setTime(timeFactory())
  }, [counter1])
  return (
    <div>
      <h3>time = {time}</h3>
      <h3 onClick={increment1}>counter1 = {counter1}</h3>
      <h3 onClick={increment2}>counter2 = {counter2}</h3>
    </div>
  );
}
