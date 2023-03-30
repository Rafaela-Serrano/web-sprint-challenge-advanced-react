import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialCoordinates = ["(1,1)","(2,1)","(3,1)","(1,2)","(2,2)","(3,2)","(1,3)","(2,3)","(3,3)"]

export default class AppClass extends React.Component {

  constructor() {

    super();

    this.state = {
      currentIndex: initialIndex,
      count:initialSteps,
      email:initialEmail,
      message:initialMessage,
    }

  }

  upHandler = () => {
    if ( this.state.currentIndex === 0|| this.state.currentIndex === 1|| this.state.currentIndex === 2 ) {
      
      this.setState({...this.state, count: this.state.count + 0, message:"You can't go up"} ) ;
     
    }  

    else {

      this.setState({...this.state, currentIndex: this.state.currentIndex - 3, count: this.state.count + 1 })

    }  
  }

  downHandler = () => {
    if ( this.state.currentIndex === 7|| this.state.currentIndex === 6|| this.state.currentIndex === 8 ) {
      
      this.setState({...this.state, count: this.state.count + 0, message:"You can't go down"} ) ;
     
    }  

    else {

      this.setState({...this.state, currentIndex: this.state.currentIndex + 3, count: this.state.count + 1 })

    }  
  }

  rightHanlder = () => {
    if ( this.state.currentIndex === 2|| this.state.currentIndex === 5|| this.state.currentIndex === 8 ) {
      
      this.setState({...this.state, count: this.state.count + 0, message:"You can't go right"} ) ;
     
    }  

    else {

      this.setState({...this.state, currentIndex: this.state.currentIndex + 1, count: this.state.count + 1 })

    }
  }

  leftHandler = () => {
    if ( this.state.currentIndex === 0|| this.state.currentIndex === 3|| this.state.currentIndex === 6 ) {
      
      this.setState({...this.state, count: this.state.count + 0, message:"You can't go left"} ) ;
     
    }  

    else {

      this.setState({...this.state, currentIndex: this.state.currentIndex - 1, count: this.state.count + 1 })

    }
  }

  emailInputHandler = e => {
    const {value} = e.target ;
    this.setState({...this.state, email: value })
  }

  reset = () => {
    this.setState({
      ...this.setState,
      currentIndex:4,
      count:0,
      email:'',
      message:'',
    })
  }

  postHandler = payload => {
     axios.post('http://localhost:9000/api/result',payload)
     .then( res => {
      this.setState({...this.state, message: res.data.message})
     })
     .catch( err => {
      this.setState({...this.state, message: err.response.data.message})
     })
  }

  submitHandler = e => {

    const payload = {
      x: initialCoordinates[this.state.currentIndex].slice(1,2),
      y: initialCoordinates[this.state.currentIndex].slice(3,4),
      email: this.state.email,
      steps: this.state.count
    }

    e.preventDefault();
    this.setState({...this.state, email:''});
    this.postHandler(payload);

  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>

        <div className="info">

          <h3 id="coordinates">{`Coordinates ${initialCoordinates.at(this.state.currentIndex)}`}</h3>

          <h3 id="steps">{`You moved ${this.state.count} ${this.state.count === 1 ? 'time': 'times'}`}</h3>

        </div>

        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.currentIndex ? ' active' : ''}`}>
                {idx === this.state.currentIndex ? 'B' : null}
              </div>
            ))
          }
        </div>

        <div className="info">

          <h3 id="message">{this.state.message}</h3>

        </div>

        <div id="keypad">

          <button 
            id="left"
            onClick={this.leftHandler}
          >LEFT</button>

          <button 
            id="up"
            onClick={this.upHandler} 
          >UP</button>

          <button 
            id="right"
            onClick={this.rightHanlder}
          >RIGHT</button>

          <button 
            id="down"
            onClick={this.downHandler}
          >DOWN</button>

          <button id="reset" onClick={this.reset}>reset</button>

        </div>

        <form>
          <input 
          id="email" 
          type="email" 
          placeholder="type email" 
          onChange={this.emailInputHandler} 
          value={this.state.email}></input>

          <input 
          id="submit" 
          type="submit" 
          onClick={this.submitHandler}></input>

        </form>

      </div>
    )
  }
}
