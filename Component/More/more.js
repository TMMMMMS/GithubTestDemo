
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class More extends Component {
  static navigationOptions = {
    title: '我的',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={() => { this.props.navigation.push('CustomKeyPage') }} >自定义标签</Text>
        <Text style={styles.welcome} onPress={() => { this.props.navigation.push('SortKeyPage') }} >标签排序</Text>
        <Text style={styles.welcome} onPress={() => { this.props.navigation.push('CustomKeyPage', {isRemoveKey:true}) }} >标签移除</Text>
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