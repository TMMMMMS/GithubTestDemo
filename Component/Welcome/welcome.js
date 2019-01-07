
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Home extends Component{

//   static navigationOptions = {
//     header:null,  //隐藏顶部导航栏
//   };
  render() {
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>欢迎页面</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
});