import './App.css';
import React, {useState, useEffect, useRef} from 'react';


function App() {
  const GAMETIME = 5
  const [text, setText] = useState("")
  const [result, setResult] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(GAMETIME)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const textBoxRef = useRef(null)
  

  useEffect(() => {
    if (timeRemaining > 0 && isTimeRunning) {
      setTimeout(() => {
        setTimeRemaining(time => time - 1)
      }, 1000);
    } else if (timeRemaining === 0 && isTimeRunning) {
      //reset time running status and the remaining time
      setIsTimeRunning(false)
    }
  }, [timeRemaining, isTimeRunning])

  //count the words
  useEffect(() => {
    if (isTimeRunning) {
      const countArr = text.trim().split(' ')
      setResult(countArr.filter(word => word !== "").length)
    }
  }, [text])

  //update "text" on change
  function handleChange(e) {
    const {value} = e.target
    setText(value)
  }

  //start/reset with one single button
  function startButton() {
    //reset
    if (timeRemaining === 0) {
      setTimeRemaining(GAMETIME)
      setResult(0)
      setText("")
    //start
    } else if (!isTimeRunning) {
      setIsTimeRunning(true)
      setResult(0)
      setText("")
      //focus will not work until the textbox is un-disabled. "setIsTimeRunning(true)" is not guaranteed to finished executing before this line. 
      textBoxRef.current.disabled = false 
      textBoxRef.current.focus()
    }
  }

  console.log(isTimeRunning);

  return (
    <div className="App">
      <h1>
        Speed Typing Game
      </h1>
      <textarea 
        name="" 
        value={text}
        id="" 
        cols="30" 
        rows="10" 
        onChange={handleChange}
        disabled={!isTimeRunning}
        ref={textBoxRef}
      />
      <h4>
        remaining time: {timeRemaining}
      </h4>
      <button onClick={startButton} disabled={isTimeRunning}>
        {timeRemaining === 0 ? "reset" : "start"}
      </button>
      <h1>
        word count: {result === 0 ? "" : result}
      </h1>
    </div>
  );
}

export default App;
