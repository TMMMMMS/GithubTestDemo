
import React, { Component } from 'react';
import { StyleSheet, View, FlatList, RefreshControl, Text, TouchableOpacity, Image } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DataRepository, { FLAG_STORAGE } from '../../expand/dao/DataRepository';
import TrendingCell from '../../Common/TrendingCell';
import LanguageDao, { FLAG_LANGUAGE } from '../../expand/dao/LanguageDao';
import NaviBar from 'react-native-pure-navigation-bar';
import ProjectModel from '../../model/ProjectModel';
import FavoriteDao from '../../expand/dao/FavoriteDao';
import Utils from '../../Util/Utils';

// var favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);
var dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
const API_URL = 'https://github.com/trending/';

export default class TrendingPage extends Component {

  static navigationOptions = {
    // title: "趋势"
    header: null
  };

  constructor(props) {
    super(props);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
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
      favoriteKeys: []
    };
    this.renderItem = this.renderItem.bind(this);
    this.onload = this.onload.bind(this);
  }

  componentDidMount() {
    this.onload();
  }

  onload() {
    let url = this.getFechUrl('?since=daily', this.props.tabLabel);
    this.setState({ refreshing: true });
    dataRepository.fetchNetRepository(url)
      .then(result => {
        this.items = result ? result : [];
        this.getFavoriteKeys();
        // this.setState({
        //   data: result,
        //   refreshing: false
        // })
      })
      .catch(error => {
        this.updateState({
          result: JSON.stringify(error),
          refreshing: false
        })
      })
  }

  getFechUrl(timeSpan, category) {
    return API_URL + category + timeSpan;
  }

  // 更新project item 收藏状态
  flushFavoriteState() {
    let projectModels = [];
    let items = this.items;
    for (let i = 0; i < items.length; i++) {
      projectModels.push(new ProjectModel(items[i], Utils.checkFavorite(items[i], this.state.favoriteKeys)));
    }
    this.updateState({
      refreshing: false,
      data: projectModels
    })
  }

  updateState(dic) {
    if (!this) return;
    this.setState(dic);
  }

  onSelect(item) {
    this.props.navigation.push('RepositoryDetail', { item: item });
  }

  // cell上收藏按钮的点击回调函数
  onFavorite(item, isFavorite) {
    if (isFavorite) {
      favoriteDao.saveFavoriteItem(item.fullName, JSON.stringify(item));
    } else {
      favoriteDao.removeFavoriteItem(item.fullName);
    }
  }

  getFavoriteKeys() {

    favoriteDao.getFavorites()
      .then(keys => {
        if (keys) {
          this.updateState({ favoriteKeys: keys })
        }
        this.flushFavoriteState();
      })
      .catch(e => {
        this.flushFavoriteState();
      })
  }

  renderItem(projectModel) {
    return (
      <TrendingCell
        projectModel={projectModel}
        onSelect={() => {
          this.onSelect(projectModel)
        }}
        onFavorite={(item, isFavorite) => this.onFavorite(item, isFavorite)}
      />
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