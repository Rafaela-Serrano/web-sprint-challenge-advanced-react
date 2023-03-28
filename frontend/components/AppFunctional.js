import React, { useState } from 'react'
import axios from 'axios'

// Suggested initial state
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialCoordinates = ["(1,1)","(2,1)","(3,1)","(1,2)","(2,2)","(3,2)","(1,3)","(2,3)","(3,3)"]

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [count, setCount] = useState(initialSteps);
  const [email, setEmail] = useState(initialEmail); 
  const [message, setMessage] = useState(initialMessage);
  


  function up() {
    if ( currentIndex === 0|| currentIndex === 1|| currentIndex === 2 ) { 
      setCount(count + 0);
      setMessage("You can't go up");
    }   
    else {
      setCurrentIndex ( currentIndex - 3 ) ;
      setCount ( count + 1 )
    }  
  }

  function down() {
    if (currentIndex === 7|| currentIndex === 6|| currentIndex === 8 ) {
      setCount (count + 0);
      setMessage("You can't go down");
    } else {
      setCurrentIndex(currentIndex + 3) ;
      setCount ( count + 1 )
    }  
  }

  function left() {
    if (currentIndex === 0|| currentIndex === 3|| currentIndex === 6 ) {
      setCount ( count + 0 );
      setMessage("You can't go left")
    } else {
      setCurrentIndex ( currentIndex - 1 ) ;
      setCount ( count + 1 )
    }  
  }

  function right() {
    if (currentIndex === 2|| currentIndex ===5 || currentIndex === 8) {
      setCount ( count + 0 );
      setMessage("You can't go right");
    } else {
      setCurrentIndex (currentIndex + 1) ; 
      setCount ( count + 1)
    }
  }

  function reset() {
    setCount(0)
    setCurrentIndex(4)
    setEmail('')
    setMessage('')
  }

  const emailInput = e => {
    const {value} = e.target;
    setEmail(value);
  }

  const post = payload => {

    axios.post('http://localhost:9000/api/result',payload)
      .then( res => {
        console.log(res)
        setMessage(res.data.message)
      })
      .catch( err => {
        setMessage(err.response.data.message)
      } )

  }


  const submit = e => {

    const payload = {
      x: initialCoordinates[currentIndex].slice(1,2),
      y: initialCoordinates[currentIndex].slice(3,4),
      email: email,
      steps: count
    }
    
    e.preventDefault();
    setEmail('');
    post(payload);

  }

  return (
    <div id="wrapper" className={props.className}>

      <div className="info">

        <h3 id="coordinates">
          {`Coordinates ${initialCoordinates.at(currentIndex)}`}
        </h3>

        <h3 id="steps" >
          {`You moved ${count} ${count === 1 ? 'time' : 'times'}`}
        </h3>
      </div>

      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === currentIndex ? ' active' : ''}`}>
              {idx === currentIndex ? 'B' : null}
            </div>
          ))
        }
      </div>

      <div className="info">
        <h3 id="message" >
          {message}
        </h3>
      </div>

      <div id="keypad">

        <button
          id="left"
          type='button'
          name='left'
          onClick={left}
        > ← </button>

        <button 
          id="up" 
          type='button' 
          name='up' 
          onClick={up}
        > ↑ </button>

        <button 
          id="right" 
          type='button' 
          name='right'
          onClick={right}
        > → </button>

        <button 
          id="down" 
          type='button' 
          name='down' 
          onClick={down}
        > ↓ </button>

        <button id="reset" type='button' name='reset' onClick={reset}>↻</button>

      </div>

      <form>
        <input id="email" type="email" placeholder="type email" onChange={emailInput}  value={email}></input>
        <input id="submit" type="submit" onClick={submit}></input>
      </form>

    </div>
  )
}
