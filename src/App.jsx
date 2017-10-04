import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          id: 101,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 102,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
        }
      ]
    }
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    const ws = new WebSocket("ws://localhost:3001");

    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({ messages: messages })
    }, 3000);
  };

  addMessage(messageBody) {
    const newMessage = {id: this.state.messages.id, username: this.state.messages.username, content: messageBody};
    const messages = this.state.messages.concat(newMessage);
    this.setState({ messages: messages });

    ws
  };

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages = { this.state.messages }/>
        <ChatBar currentUser = { this.state.currentUser } addMessage= { this.addMessage }/>
      </div>
    );
  }
}

export default App;
