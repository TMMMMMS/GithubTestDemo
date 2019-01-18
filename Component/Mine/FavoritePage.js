
import React, { Component } from 'react';
import { StyleSheet, View, FlatList, RefreshControl, Text } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { FLAG_STORAGE } from '../../expand/dao/DataRepository';
import RepositoryCell from '../../Common/RepositoryCell';
import TrendingCell from '../../Common/TrendingCell';
import ProjectModel from '../../model/ProjectModel';
import FavoriteDao from '../../expand/dao/FavoriteDao';

export default class FavoritePage extends Component {

  static navigationOptions = {
    title: "收藏"
  };

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentDidMount() {
  }


  render() {

    return (
      <View style={styles.container}>
        <ScrollableTabView tabBarUnderlineStyle={{ backgroundColor: '#1296db' }} tabBarActiveTextColor='#1296db'>
          <FavoriteTab tabLabel={'最热'} key={1} {...this.props} flag={FLAG_STORAGE.flag_popular} >最热</FavoriteTab>
          <FavoriteTab tabLabel={'趋势'} key={2} {...this.props} flag={FLAG_STORAGE.flag_trending} >趋势</FavoriteTab>
        </ScrollableTabView>
      </View>
    );
  }
}

class FavoriteTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing:false,
      data: ''
    };
    this.favoriteDao = new FavoriteDao(props.flag)
    this.renderItem = this.renderItem.bind(this);
    this.onload = this.onload.bind(this);
  }

  componentDidMount() {
    this.onload();
  }


  updateState(dic) {
    if (!this) return;
    this.setState(dic);
  }

  onload() {

    this.setState({ refreshing: true });
    this.favoriteDao.getAllItems()
      .then(items => {
        var resultData = [];
        for (let i = 0; i < items.length; i++) {
          resultData.push(new ProjectModel(items[i], true));
        }
        this.updateState({
          refreshing: false,
          data: resultData
        })
      })
      .catch(e => {
        this.updateState({
          refreshing: false,
        })
      })

  }

  onSelect(item) {
    this.props.navigation.push('RepositoryDetail2', { item: item, flag: this.props.flag });
  }

  // cell上收藏按钮的点击回调函数
  onFavorite(item, isFavorite) {

    let key = this.props.flag !== FLAG_STORAGE.flag_popular ? item.fullName : item.id.toString();

    if (isFavorite) {
      this.favoriteDao.saveFavoriteItem(key, JSON.stringify(item));
    } else {
      this.favoriteDao.removeFavoriteItem(key);
    }
  }

  renderItem(projectModel) {

    let CellComponent = this.props.flag === FLAG_STORAGE.flag_popular ? RepositoryCell : TrendingCell;

    return (
      <CellComponent
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
          ListEmptyComponent={
            <Text>暂无数据</Text>
          }
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