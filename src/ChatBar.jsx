import React, { Component } from 'react';

class ChatBar extends Component {
  constructor() {
    super();
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress(event) {
    if(event.key == 'Enter') {
      this.props.addMessage(event.target.value);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={ this.props.currentUser.name } />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress= {this.onKeyPress} />
      </footer>
    )
  }
}

export default ChatBar;