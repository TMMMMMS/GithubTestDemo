
import React from 'react';
import { Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import Home from '../Home/home';
import Mine from '../Mine/mine';
import More from '../More/more';
import CustomKeyPage from '../More/CustomKeyPage';
import SortKeyPage from '../More/SortKeyPage';
import RepositoryDetail from '../Home/RepositoryDetail';
import TrendingPage from '../Shop/TrendingPage';

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}

const HomeStack = createStackNavigator({
  Home: { screen: Home },
  RepositoryDetail: { screen: RepositoryDetail },
});

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const ShopStack = createStackNavigator({
  TrendingPage: { screen: TrendingPage },
  RepositoryDetail: { screen: RepositoryDetail },
});

const MineStack = createStackNavigator({
  Mine: { screen: Mine },
  Details: { screen: DetailsScreen },
});

const MoreStack = createStackNavigator({
  More: {
    screen: More,
    navigationOptions: {
      headerBackTitle: "返回",
    }
  },
  CustomKeyPage: {
    screen: CustomKeyPage,
  },
  SortKeyPage: {
    screen: SortKeyPage,
  },
});

ShopStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

MoreStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export default createAppContainer(createBottomTabNavigator(

  {
    Home: {
      screen: HomeStack, // 对应跳转到的界面
      navigationOptions: {
        tabBarLabel: '首页', // tabBar显示的文字
        tabBarIcon: ({ tintColor }) => ( // tabBar显示的图标
          // 这里使用了react-native-vector-icons, 不熟悉的请看上方连接
          // <Icon
          //   name="rocket"   //图片名连接,可以到这个网址搜索:http://ionicons.com/, 使用时:去掉前面的 "icon-" !!!!
          //   size={30}   //图片大小
          //   color="red"  //图片颜色
          // />
          <FontAwesome
            name={'home'}
            size={30}
            color={tintColor}
          />
        )
      }
    },
    Shop: {
      screen: ShopStack,
      navigationOptions: {
        tabBarLabel: '商城',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome
            name={'shopping-bag'}
            size={30}
            color={tintColor}
          />
        )
      }
    },

    Mine: {
      screen: MineStack,
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome
            name={'address-card'}
            size={30}
            color={tintColor}
          />
        )
      }
    },

    More: {
      screen: MoreStack,
      navigationOptions: {
        tabBarLabel: '更多',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name={'more'}
            size={30}
            color={tintColor}
          />
        )
      }
    }

  },
  {
    initialRouteName: 'Home', // 设置默认的页面

    lazy: true, // 是否在app打开的时候将底部标签栏全部加载
    backBehavior: null, // 点击返回退到上级界面

    tabBarOptions: {
      activeTintColor: '#1296db', // 选中时tab的label/icon的颜色
      inactiveTintColor: 'gray', // 未选中的颜色

      showLabel: true,
      showIcon: true,
      style: { // 整体TabBar的样式
        backgroundColor: 'white',
        height: 54,
      },
      tabStyle: { // TabBar内单独tab的样式
        height: 54,
      },
      labelStyle: { // TabBar内单独tab的文字样式
        fontSize: 12,
      },
    }
  }
));

