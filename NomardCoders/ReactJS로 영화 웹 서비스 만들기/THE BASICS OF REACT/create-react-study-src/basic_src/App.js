import Button from "./Button";
import styles from "./App.module.css";
import { useEffect, useState } from "react";



function App() {
  // useState ( state, action )
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");

  const onClick = () => setCounter((prev) => prev + 1);
  const onChange = (event) => {
    setKeyword(event.target.value);
  }
  // change state -> run all the time
  console.log("it run all the time")

  // but need to only one run
  // useEffect(action, Array of dependent  state)
  // #1. just one run without restrictions
  const iRunOnlyOne = () => {
    console.log("i run only once.")
  }
  useEffect(iRunOnlyOne, []);
  // #2. just one with state
  useEffect(() => {
    console.log("when change to counter : ", counter)
  }, [counter])
  // #3. add conditional statement
  useEffect(() => {
    if (keyword !== "" && keyword.length > 5) {
      console.log("SEARCH FOR keyword :", keyword)
    }
  }, [keyword])
  // #4. relational 
  useEffect(() => {
    console.log("Relational operator || so change :", counter)
  }, [counter, keyword])

  // Cleanup Function
  // component가 render에서 사라질때, 
  const [show, setShow] = useState(false);
  const onClick2 = () => {
    setShow(!show)
  }
  function Hello() {
    function byFn() {
      console.log("Bye :(")
  
    }
    function HiFn() {
      console.log("Hello :)")
      return byFn
    }
    useEffect(HiFn, [])
    return (
      <h1>Hello</h1>
    )
  }

  return (
    <div className={styles.title}>

      <Button text={"hello"} />
      <h1>Welcome Back !!</h1>
      <h2>{counter}</h2>
      <button onClick={onClick}>Temp button</button>

      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here.."
      />

      <div>
        {show ? <Hello /> : null}
        <button onClick={onClick2}>{show ? "Hide" : "Show"}</button>
      </div>
    </div>
  );
}

export default App;
