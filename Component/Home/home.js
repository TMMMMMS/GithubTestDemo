
import React, { Component } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DataRepository, { FLAG_STORAGE } from '../../expand/dao/DataRepository';
import RepositoryCell from '../../Common/RepositoryCell';
import LanguageDao, { FLAG_LANGUAGE } from '../../expand/dao/LanguageDao';
import ProjectModel from '../../model/ProjectModel';
import FavoriteDao from '../../expand/dao/FavoriteDao';
import Utils from '../../Util/Utils';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

// 全局都可以使用该favoriteDao
var favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular)

export default class Home extends Component {

  static navigationOptions = {
    title: "最热"
  };

  constructor(props) {
    super(props);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.dataRepository = new DataRepository(FLAG_STORAGE.flag_popular);
    this.state = {
      languages: [],
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
      {this.state.languages.map((result, i, arr) => {
        let lan = arr[i];
        return lan.checked ?
          <PopularTab tabLabel={lan.name} key={i} {...this.props} >{lan.name}</PopularTab> : null
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
      dataSource: [],
      refreshing: false,
      favoriteKeys: []
    };
    this.dataRepository = new DataRepository();
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.onload();
  }

  returnData(data) {
    alert('回调了');
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
      dataSource: projectModels
    })
  }

  updateState(dic) {
    if (!this) return;
    this.setState(dic);
  }

  onload() {
    let url = URL + this.props.tabLabel + QUERY_STR;
    this.updateState({ refreshing: true });
    this.dataRepository.fetchNetRepository(url)
      .then(result => {
        this.items = result && result.items.length ? result.items : [];
        this.getFavoriteKeys();
      })
      .catch(error => {
        this.updateState({
          refreshing: false
        })
      })
  }

  onSelect(item) {
    this.props.navigation.push('RepositoryDetail', {
      item: item, flag: FLAG_STORAGE.flag_popular, callback: (returnData) => {
        this.onload();
      }
    });
  }

  // cell上收藏按钮的点击回调函数
  onFavorite(item, isFavorite) {
    if (isFavorite) {
      favoriteDao.saveFavoriteItem(item.id.toString(), JSON.stringify(item));
    } else {
      favoriteDao.removeFavoriteItem(item.id.toString());
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
      <RepositoryCell
        projectModel={projectModel}
        onSelect={() => {
          this.onSelect(projectModel)
        }}
        onFavorite={(item, isFavorite) => this.onFavorite(item, isFavorite)}
      />
    )
  }

  _keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.state.dataSource}
          renderItem={this.renderItem}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onload()}
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