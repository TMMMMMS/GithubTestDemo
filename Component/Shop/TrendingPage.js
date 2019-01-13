
import React, { Component } from 'react';
import { StyleSheet, View, FlatList, RefreshControl, Text, TouchableOpacity, Image } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DataRepository, { FLAG_STORAGE } from '../../expand/dao/DataRepository';
import TrendingCell from '../../Common/TrendingCell';
import LanguageDao, { FLAG_LANGUAGE } from '../../expand/dao/LanguageDao';
import NaviBar from 'react-native-pure-navigation-bar';
import TimeSpan from '../../model/TimeSpan';

const API_URL = 'https://github.com/trending/';

export default class TrendingPage extends Component {

  static navigationOptions = {
    // title: "趋势"
    header: null
  };

  constructor(props) {
    super(props);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
    this.dataRepository = new DataRepository(FLAG_STORAGE.flag_popular);
    this.state = {
      languages: [],
      refreshing: false,
      isVisible: false
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

  showPopover() {
    this.refs.button.measure((ox, oy, width, height, px, py) => {
      this.setState({
        isVisible: true,
        buttonRect: { x: px, y: py, width: width, height: height }
      });
    });
  }

  closePopover() {
    this.setState({ isVisible: false });
  }

  renderTitleView() {

    return <View>
      <TouchableOpacity ref='button' onPress={() => this.show}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>趋势</Text>
          <Image source={{ uri: 'ic_spinner_triangle' }} style={{ width: 14, height: 14, tintColor: '#1296db', marginLeft: 5 }} ></Image>
        </View>
      </TouchableOpacity>
    </View>
  }

  render() {

    let content = this.state.languages.length ? <ScrollableTabView tabBarUnderlineStyle={{ backgroundColor: '#1296db' }} tabBarActiveTextColor='#1296db'>
      {this.state.languages.map((result, i, arr) => {
        let lan = arr[i];
        return lan.checked ?
          <TrendingTab tabLabel={lan.name} key={i} {...this.props} >{lan.name}</TrendingTab> : null
      })}
    </ScrollableTabView> : null;

    return (
      <View style={styles.container}>
        <NaviBar
          title={this.renderTitleView()}
          gobackImage={null} />
        {content}
      </View>
    );
  }
}

class TrendingTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
    this.renderItem = this.renderItem.bind(this);
    this.onload = this.onload.bind(this);
  }

  componentDidMount() {
    this.onload();
  }

  onload() {
    let url = this.getFechUrl('?since=daily', this.props.tabLabel);
    this.setState({ refreshing: true });
    this.dataRepository.fetchNetRepository(url)
      .then(result => {
        this.setState({
          data: result,
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

  getFechUrl(timeSpan, category) {
    return API_URL + category + timeSpan;
  }

  onSelect(item) {
    this.props.navigation.push('RepositoryDetail', { item: item });
  }

  renderItem(data) {
    return (
      <TrendingCell item={data.item} onSelect={() => {
        this.onSelect(data.item)
      }} />
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