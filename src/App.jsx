import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { 'name' : 'Anonymous'},
      messages: []
    };
  }

  componentDidMount() {
    this.ws = new WebSocket(`ws://${location.hostname}:3001`);

    this.ws.addEventListener('message', message => {
      const data = JSON.parse(message.data);
      switch(data.type) {
        case 'postMessage':
          this.setState({
            messages: this.state.messages.concat(data)
          });
          break;
        case 'nameChange':
          console.log(data.oldName + ' changed their name to ' + data.newName)
          break;
        default:
          console.info('Unknown data %o', data);
      }
    });
  }

  sendData(data) {
    this.ws.send(JSON.stringify(data));
  }

  sendMessage = (newMsg) => {
    this.sendData({
      type: 'postMessage',
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

  postNotification = () => {
    this.sendData({
      type: 'postNotification'
    })
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages = { this.state.messages }/>
        <ChatBar
          currentUser = { this.state.currentUser }
          editName = { this.editName }
          sendMessage = { this.sendMessage }
          postNotification = { this.postNotification }
          />
      </div>
    );
  }
}

export default App;
