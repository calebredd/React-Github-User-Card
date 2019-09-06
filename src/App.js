import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = { doggos: [] };
  }
  componentDidMount() {
    fetch("https://dog.ceo/api/breed/labrador/images")
      .then(res => res.json())
      .then(dogs => this.setState({ doggos: dogs.message }))
      .catch(err => console.log("noooo"));
  }
  render() {
    // console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <h1>Github Users</h1>
            </header>
          <div>
            {this.state.doggos.map(dogs => (
              <img src={dogs} alt="Dog" />
            ))}
          </div>
      </div>
    );
  }
}
