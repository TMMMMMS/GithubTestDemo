
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Home extends Component{

  static navigationOptions = {
    header:null,  //隐藏顶部导航栏
  };
  render() {
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Home页面</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});