
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LanguageDao, { FLAG_LANGUAGE } from '../../expand/dao/LanguageDao'

export default class More extends Component {
  static navigationOptions = {
    title: '我的',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={() => { this.props.navigation.push('CustomKeyPage', { titleName: "自定义标签", flag: FLAG_LANGUAGE.flag_key }) }} >自定义标签</Text>
        <Text style={styles.welcome} onPress={() => { this.props.navigation.push('SortKeyPage', { titleName: "标签排序" }) }} >标签排序</Text>
        <Text style={styles.welcome} onPress={() => { this.props.navigation.push('CustomKeyPage', { titleName: "标签移除", isRemoveKey: true }) }} >标签移除</Text>
        <Text style={styles.welcome} onPress={() => { this.props.navigation.push('CustomKeyPage', { titleName: "自定义语言", flag: FLAG_LANGUAGE.flag_language }) }} >自定义语言</Text>
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