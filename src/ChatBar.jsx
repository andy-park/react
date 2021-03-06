import React, { Component } from 'react';

class ChatBar extends Component {
  constructor() {
    super();
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onNameEdit = this.onNameEdit.bind(this);
  }

  onKeyPress(event) {
    if (event.key == 'Enter') {
      event.preventDefault();
      this.props.sendMessage(event.target.value);
      event.target.value = '';
    }
  }

  onNameEdit(event) {
    if (event.key == 'Enter') {
      event.preventDefault();
      this.props.editName(event.target.value);
      event.target.value = '';
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={ this.props.currentUser } onKeyDown={ this.onNameEdit }/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={ this.onKeyPress } />
      </footer>
    )
  }
}

export default ChatBar;