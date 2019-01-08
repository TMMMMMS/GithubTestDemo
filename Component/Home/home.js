
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import DataRepository from '../../expand/dao/DataRepository';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class Home extends Component {

  static navigationOptions = {
    header: null,  //隐藏顶部导航栏
  };

  constructor(props) {
    super(props);
    this.state = {
      result: ''
    };
    this.dataRepository = new DataRepository();
    this.onload = this.onload.bind(this);
  }

  onload() {
    this.dataRepository.fetchNetRepository(this.genUrl(this.text))
      .then(result => {
        this.setState({
          result: JSON.stringify(result)
        })
      })
      .catch(error => {
        this.setState({
          result: JSON.stringify(error)
        })
      })
  }

  genUrl(key) {
    return URL + key + QUERY_STR;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={styles.welcome}
          onPress={this.onload}
        >获取数据</Text>
        <TextInput
          style={{ height: 40, borderWidth: 1 }}
          onChangeText={text => this.text = text}
        />
        <Text style={{height:400}}>{this.state.result}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    paddingTop: 50,
    fontSize: 20,
  },
});