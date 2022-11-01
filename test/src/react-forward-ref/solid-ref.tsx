import { render } from "solid-js/web";
import { createSignal, onMount } from "solid-js";

function MyComp(props: { ref: HTMLDivElement }) {
  return <div ref={props.ref}>MyComp</div>
}

function App() {
  let myDiv: HTMLDivElement;
  const [width, setWidth] = createSignal(0);
  // same? onMount vs setTimeout
  //setTimeout(() => {
  onMount(() => {
    console.log(myDiv.clientWidth)
    setWidth(myDiv.clientWidth)
  });
  return (
    <div>
      <div>App</div>
      <MyComp ref={myDiv} />
      <div>width = {width()}</div>
      <div>myDiv.clientWidth = {myDiv.clientWidth}</div>
    </div>
  )
}

render(() => <App />, document.getElementById("app")!);
