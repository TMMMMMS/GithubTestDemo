
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DataRepository from '../../expand/dao/DataRepository';
import RepositoryCell from '../../Common/RepositoryCell';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class Home extends Component {

  static navigationOptions = {
    title: "最热"
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
        <ScrollableTabView>
          <PopularTab tabLabel="iOS">iOS</PopularTab>
          <PopularTab tabLabel="Android">Android</PopularTab>
          <PopularTab tabLabel="JavaScript">JavaScript</PopularTab>
          <PopularTab tabLabel="Java">Java</PopularTab>
        </ScrollableTabView>
        {/* <Text
          style={styles.welcome}
          onPress={this.onload}
        >获取数据</Text>
        <TextInput
          style={{ height: 40, borderWidth: 1 }}
          onChangeText={text => this.text = text}
        />
        <Text style={{height:400}}>{this.state.result}</Text> */}
      </View>
    );
  }
}

class PopularTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
    this.dataRepository = new DataRepository();
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.onload();
  }

  onload() {
    let url = URL + this.props.tabLabel + QUERY_STR
    this.dataRepository.fetchNetRepository(url)
      .then(result => {
        this.setState({
          data: result.items
        })
      })
      .catch(error => {
        this.setState({
          result: JSON.stringify(error)
        })
      })
  }
  renderItem(data) {
    return (
      <RepositoryCell item={data.item} />
      // <View style={{padding:10}}>
      //   <Text>{item.item.full_name}</Text>
      //   <Text>{item.item.description}</Text>
      //   <Text>{item.item.owner.avatar_url}</Text>
      //   <Text>{item.item.stargazers_count}</Text>
      // </View>
    );
  }

  _keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.state.data}
          renderItem={this.renderItem}
        // ListHeaderComponent={<HomePageHeaderView />}
        />
      </View>
    )
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