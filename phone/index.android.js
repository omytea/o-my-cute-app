'use strict'; 
var React = require('react-native'); 
var { AppRegistry, StyleSheet, TextInput, Text, View, TouchableHighlight} = React; 


var wsClient = React.createClass({
  getInitialState: function() {
    return {
      curText: 'Hello world',
      prevText: '',
      serverIP: '',
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
    this.setState({ serverIP: event.nativeEvent.text })
  },

  onConnectButtonPressed() {
    this.ws = new WebSocket('ws://' + this.state.serverIP)
    this.ws.onmessage = function(event){
      this.updateText(event.data)
    }
    this.setState({ connected: true })
    this.updateText("Connect to server " + this.state.serverIP)
    // var oRegister = { "act":"register", "client":"phone"}
    // this.ws.send(JSON.stringify(oRegister))
    // this.ws.send(JSON.stringify({"act":"register", "client":"phone"}))
    // this.updateText("send " + JSON.stringify(oRegister))
  },

  onMotionButtonPressed(motion, direction) {
    var oMove = {
      "act": "move",
      "translate": [0,0,0],
      "rotate": [0,0,0]
    }
    oMove[motion] = direction
    this.ws.send(JSON.stringify(oMove))
    this.updateText("send message "+ JSON.stringify(oMove))
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
              onPress={this.onConnectButtonPressed.bind(this)}>
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>
        <Text style={styles.description}>Translate</Text>
        <View style={styles.flowRight}>
        <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.onMotionButtonPressed.bind(this, "translate", [0,0.1,0])}>
          <Text style={styles.buttonText}>Up</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.onMotionButtonPressed.bind(this, "translate", [0,-0.1,0])}>
          <Text style={styles.buttonText}>Down</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.onMotionButtonPressed.bind(this, "translate", [-0.1,0,0])}>
          <Text style={styles.buttonText}>Left</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.onMotionButtonPressed.bind(this, "translate", [0.1,0,0])}>
          <Text style={styles.buttonText}>Right</Text>
        </TouchableHighlight>
        </View>
        <Text style={styles.description}>Rotate</Text>
        <View style={styles.flowRight}>
        <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.onMotionButtonPressed.bind(this, "rotate", [0,1,0])}>
          <Text style={styles.buttonText}>Up</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.onMotionButtonPressed.bind(this, "rotate", [0,-1,0])}>
          <Text style={styles.buttonText}>Down</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.onMotionButtonPressed.bind(this, "rotate", [-1,0,0])}>
          <Text style={styles.buttonText}>Left</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.onMotionButtonPressed.bind(this, "rotate", [1,0,0])}>
          <Text style={styles.buttonText}>Right</Text>
        </TouchableHighlight>
        </View>
        <Text style={styles.eventLabel}>
          {this.state.curText + '\n'}
          Prev: {this.state.prevText}
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
  ipInput: {
    height: 36,
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