import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.scss";

export default class App extends Component {
  constructor() {
    super();
    this.state = { user: {}, following: [], value: "" };
  }

  componentDidMount() {
    fetch("https://api.github.com/users/calebredd")
      .then(res => res.json())
      .then(user => {
        this.setState({ user: user });
        // console.log(this.state.user);
        fetch("https://api.github.com/users/calebredd/following")
          .then(res => res.json())
          .then(follow => {
            this.setState({ following: follow });
            // console.log(this.state.following);
          })
          .catch(err => console.err(err));
      })
      .catch(err => console.err(err));
  }

  render() {
    const handleSubmit = event => {
      event.preventDefault();
      console.log(this.state.value);
      fetch(`https://api.github.com/users/${this.state.value}`)
        .then(res => res.json())
        .then(user => {
          this.setState({ user: user });
          console.log(this.state.user);
          fetch(`https://api.github.com/users/${this.state.value}/following`)
            .then(res => res.json())
            .then(follow => {
              this.setState({ following: follow });
              // console.log(this.state.following);
            })
            .catch(err => console.err(err));
        })
        .catch(err => console.err(err));
    };
    const handleChange = event => {
      this.setState({ value: event.target.value });
      console.log(event.target.value);
    };
    return (
      <div className="App">
        <header className="App-header">
          <h1>Github Users</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="github username"
              onChange={handleChange}
            />
          </form>
        </header>
        <div className="card">
          <div className="profile">
            <img src={this.state.user.avatar_url} alt="Face" />
            <h2>{this.state.user.name}</h2>
          </div>
          <div className="info">
            <p>Username: {this.state.user.login}</p>
            <p>Location: {this.state.user.location}</p>
            <p>
              Github:{" "}
              <a href={this.state.user.html_url}>{this.state.user.html_url}</a>
            </p>
          </div>
        </div>
        <div className="following">
          {this.state.following.map(follower => (
            <div key={follower.login} id={follower.login} className="follows">
              <a href={follower.html_url}>
                <img src={follower.avatar_url} alt="Face" />
                <h3>{follower.login}</h3>
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
