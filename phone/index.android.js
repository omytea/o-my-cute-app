'use strict'; 
var React = require('react-native'); 
var { AppRegistry, StyleSheet, TextInput, Text, View, TouchableHighlight} = React; 


var wsClient = React.createClass({
  getInitialState: function() {
    return {
      curText: 'Hello world',
      prevText: '',
      serverIP: '192.168.1.108:8080',
      connected: false,
    };
  },

  updateText: function(text) {
    this.setState({
      curText: text,
      prevText: this.state.curText,
    });
  },

  onTextChanged(event) {
    this.setState({ searchString: event.nativeEvent.text })
  },

  onGoButtonPressed() {
    this.ws = new WebSocket('ws://' + this.state.serverIP)
    this.ws.onmessage = function(event){
      this.updateText(event.data)
    }
    this.setState({ connected: true })
    this.updateText("Connect to server " + this.state.serverIP)
  },

  onSendButtonPressed() {
    this.ws.send(this.state.curText)
    this.updateText("send message" )
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Please type in the cutest server ever!
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.ipInput}
            placeholder='127.0.0.1'
            value={this.state.serverIP}
            onChange={this.onTextChanged.bind(this)}/>
          <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4'
              onPress={this.onGoButtonPressed.bind(this)}>
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.onSendButtonPressed.bind(this)}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableHighlight>
        <Text style={styles.eventLabel}>
          {this.state.curText + '\n'}
          {this.state.prevText}
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {ipeight: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  eventLabel: {
    margin: 3,
    fontSize: 12,
  },
});

AppRegistry.registerComponent('omyapp', () => wsClient);