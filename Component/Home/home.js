
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
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
      result: '',
      refreshing: false,
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
        <ScrollableTabView tabBarUnderlineStyle={{ backgroundColor: '#1296db' }} tabBarActiveTextColor='#1296db'>
          <PopularTab tabLabel="iOS">iOS</PopularTab>
          <PopularTab tabLabel="Android">Android</PopularTab>
          <PopularTab tabLabel="JavaScript">JavaScript</PopularTab>
          <PopularTab tabLabel="Java">Java</PopularTab>
        </ScrollableTabView>
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
    this.onload = this.onload.bind(this);
  }

  componentDidMount() {
    this.onload();
  }

  onload() {
    let url = URL + this.props.tabLabel + QUERY_STR;
    this.setState({ refreshing: true });
    this.dataRepository.fetchNetRepository(url)
      .then(result => {
        this.setState({
          data: result.items,
          refreshing: false
        })
      })
      .catch(error => {
        this.setState({
          result: JSON.stringify(error),
          refreshing: false
        })
      })
  }
  renderItem(data) {
    return (
      <RepositoryCell item={data.item} />
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
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onload}
              colors={['#1296db']}
              title={'Loading'}
              titleColor={['#1296db']}
            />
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});