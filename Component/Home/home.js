
import React, { Component } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DataRepository from '../../expand/dao/DataRepository';
import RepositoryCell from '../../Common/RepositoryCell';
import LanguageDao, { FLAG_LANGUAGE } from '../../expand/dao/LanguageDao';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class Home extends Component {

  static navigationOptions = {
    title: "最热"
  };

  constructor(props) {
    super(props);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.dataRepository = new DataRepository();
    this.onload = this.onload.bind(this);
    this.state = {
      languages:[],
      refreshing: false,
    };
  }

  componentDidMount() {

    this.languageDao.fetch()
      .then(result => {
        this.setState({
          languages: result
        })
      })
      .catch(error => {
        console.log(error);
      })
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

    let content = this.state.languages.length ? <ScrollableTabView tabBarUnderlineStyle={{ backgroundColor: '#1296db' }} tabBarActiveTextColor='#1296db'>
    {this.state.languages.map((result,i,arr)=>{
      let lan = arr[i];
      return lan.checked ? 
      <PopularTab tabLabel={lan.name} key={i}>{lan.name}</PopularTab>:null
    })}
  </ScrollableTabView> : null;

    return (
      <View style={styles.container}>
        {content}
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