import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCount: 0,
      currentUser: { 'name' : 'Andy'},
      messages: []
    };
  }

  componentDidMount() {
    this.ws = new WebSocket(`ws://${location.hostname}:3001`);

    this.ws.addEventListener('message', message => {
      const data = JSON.parse(message.data);
      console.log(data);
      switch(data.type) {
        case 'message':
        case 'systemMessage':
          this.setState({
            messages: this.state.messages.concat(data)
          });
          break;
          break;
        case 'count':
            this.setState({
              userCount: data.users
            })
          break;
        default:
          console.info('Unknown event type', data.type);
          console.log(data);
      }
    });
  }

  sendData(data) {
    this.ws.send(JSON.stringify(data));
  }

  sendMessage = (newMsg) => {
    this.sendData({
      type: 'message',
      username: this.state.currentUser.name,
      content: newMsg
    });
  }

  editName = (newName) => {
    this.sendData({
      type: 'nameChange',
      oldName: this.state.currentUser.name,
      newName,
    });
    this.setState({ currentUser: { name: newName } });
  }

  render() {
    return (
      <div>
        <NavBar userCount={ this.state.userCount } />
        <MessageList
          messages = { this.state.messages }
          />
        <ChatBar
          currentUser = { this.state.currentUser.name }
          editName = { this.editName }
          sendMessage = { this.sendMessage }
          />
      </div>
    );
  }
}

export default App;
