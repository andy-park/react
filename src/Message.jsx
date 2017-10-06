import React, { Component } from 'react';

class Message extends Component {

  systemMessage(content) {
    return (
      <div className="message system">
        <span className="message-content">{ content }</span>
      </div>
    );
  }

  regularMessage(username, content) {
    return (
      <div className="message">
        <span className="message-username">{ username }</span>
        <span className="message-content">{ content }</span>
      </div>
    )
  }

  render() {
    switch(this.props.type) {
      case 'message': return this.regularMessage(this.props.username, this.props.content);
      case 'systemMessage': return this.systemMessage(this.props.content);
    }
  }
}

export default Message;