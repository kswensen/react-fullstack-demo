import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();

    this.state = {
      superhero: '',
      power: '',
      superheroes: []
    }
  }

  componentDidMount(){
    axios.get('http://localhost:3002/api/superheroes').then(res => {
      this.setState({
        superheroes: res.data
      })
    })
  }

  superheroInput(enteredSuperhero){
    this.setState({
      superhero: enteredSuperhero
    })
  }

  powerInput(enteredPower){
    this.setState({
      power: enteredPower
    })
  }

  submit(){
    let superhero = {
      name: this.state.superhero,
      power: this.state.power
    }
    axios.post('http://localhost:3002/api/newSuperhero', superhero).then((res) => {
      if(res.status === 200){
        this.setState({
          superheroes: [...this.state.superheroes, superhero],
          superhero: '',
          power: ''
        })
      }
    })
  }
  
  render() {
    let superheroes = this.state.superheroes.map((superhero, i) => {
      return (
        <ul key={i} className="list">
          <h4>{superhero.name}:</h4>
          <p> {superhero.power}</p>
        </ul>
      )
    })
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
          <input value={this.state.superhero} placeholder="Superhero" onChange={(e)=> this.superheroInput(e.target.value)}></input>
          <br/>
          <input value={this.state.power} placeholder="Power" onChange={(e)=> this.powerInput(e.target.value)}></input>
          <br/>
          <button onClick={()=> this.submit()}>Submit</button>
          <br/>
          {superheroes}
      </div>
    );
  }
}

export default App;
