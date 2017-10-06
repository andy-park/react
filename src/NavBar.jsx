import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <button className="navbar-counter"> { this.props.userCount } user(s) online</button>
      </nav>
    )
  }
}

export default NavBar;