
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import LanguageDao, { FLAG_LANGUAGE } from '../../expand/dao/LanguageDao';
import { MORE_MENU } from '../../Common/MoreMenu';
import GlobalStyles from '../../Common/GlobalStyles';
import ViewUtils from '../../Util/ViewUtils';

export default class More extends Component {
  static navigationOptions = {
    title: '我的',
  };

  onclick(tab) {

    let TargetComponent, params = { ...this.props, menuType: tab };

    switch (tab) {
      case MORE_MENU.Custom_Lnaguage:
        TargetComponent = 'CustomKeyPage';
        params.titleName = '自定义语言';
        params.flag = FLAG_LANGUAGE.flag_language
        break;
      case MORE_MENU.Custom_key:
        TargetComponent = 'CustomKeyPage';
        params.titleName = '自定义标签';
        params.flag = FLAG_LANGUAGE.flag_key
        break;
      case MORE_MENU.Remove_Key:
        TargetComponent = 'CustomKeyPage';
        params.titleName = '标签移除';
        params.isRemoveKey = true;
        params.flag = FLAG_LANGUAGE.flag_key
        break;
      case MORE_MENU.Sort_key:
        TargetComponent = 'SortKeyPage';
        params.titleName = '标签排序';
        params.flag = FLAG_LANGUAGE.flag_key
        break;
      case MORE_MENU.Sort_Language:
        alert('没做');
        break;
      case MORE_MENU.Custom_Theme:

        break;
      case MORE_MENU.About_Author:

        break;
      case MORE_MENU.About:
        TargetComponent = 'AboutPage'
        break;

    }
    if (TargetComponent) {
      this.props.navigation.push(TargetComponent, params);
    }
  }

  getItem(tag, icon, text) {
    return ViewUtils.getSettingItem(() => this.onclick(tag), icon, text, { tintColor: '#1296db' }, null)
  }

  render() {
    return (
      <View style={GlobalStyles.root_container}>
        <ScrollView>
          <TouchableOpacity onPress={() => this.onclick(MORE_MENU.About)}>
            <View style={[styles.item, { height: 90 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: 'ic_trending' }} style={{ width: 40, height: 40, marginRight: 10, tintColor: '#1296db' }} />
                <Text>Github Popular</Text>
              </View>
              <Image source={{ uri: 'ic_tiaozhuan' }} style={{ marginRight: 10, height: 22, width: 22, tintColor: '#1296db' }} />
            </View>
          </TouchableOpacity>
          <View style={GlobalStyles.line} />

          {/* 趋势管理 */}
          <Text style={styles.groupTitle}>趋势管理</Text>
          <View style={GlobalStyles.line} />
          {this.getItem(MORE_MENU.Custom_Lnaguage, 'ic_custom_language', '自定义语言')}

          <View style={GlobalStyles.line} />
          {this.getItem(MORE_MENU.Sort_Language, 'ic_swap_vert', '语言排序')}
          <View style={GlobalStyles.line} />

          {/* 标签管理 */}
          <Text style={styles.groupTitle}>标签管理</Text>
          <View style={GlobalStyles.line} />
          {this.getItem(MORE_MENU.Custom_key, 'ic_custom_language', '自定义标签')}

          <View style={GlobalStyles.line} />
          {this.getItem(MORE_MENU.Sort_key, 'ic_swap_vert', '标签排序')}

          <View style={GlobalStyles.line} />
          {this.getItem(MORE_MENU.Remove_Key, 'ic_remove', '标签移除')}
          <View style={GlobalStyles.line} />

          {/* 设置 */}
          <Text style={styles.groupTitle}>设置</Text>
          <View style={GlobalStyles.line} />
          {this.getItem(MORE_MENU.Custom_Theme, 'ic_view_quilt', '自定义主题')}
          <View style={GlobalStyles.line} />
          {this.getItem(MORE_MENU.About_Author, 'ic_insert_emoticon', '关于作者')}
          <View style={GlobalStyles.line} />

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  groupTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    color: 'gray'
  }
});

{/* <Text style={styles.welcome} onPress={() => { this.props.navigation.push('CustomKeyPage', { titleName: "自定义标签", flag: FLAG_LANGUAGE.flag_key }) }} >自定义标签</Text>
<Text style={styles.welcome} onPress={() => { this.props.navigation.push('SortKeyPage', { titleName: "标签排序" }) }} >标签排序</Text>
<Text style={styles.welcome} onPress={() => { this.props.navigation.push('CustomKeyPage', { titleName: "标签移除", isRemoveKey: true }) }} >标签移除</Text>
<Text style={styles.welcome} onPress={() => { this.props.navigation.push('CustomKeyPage', { titleName: "自定义语言", flag: FLAG_LANGUAGE.flag_language }) }} >自定义语言</Text> */}