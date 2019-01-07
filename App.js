/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Main from './Component/Main/main';
import Welcome from './Component/Welcome/welcome';
import { StackNavigator } from 'react-navigation';

// const RootApp = StackNavigator({
//   Main: { screen: Main },
//   Welcome: {
//     screen: Welcome,
//     navigationOptions: ({ navigation }) => ({
//       header: null
//     })
//   }
// },
//   {
//     initialRouteName: 'Welcome',
//     headerMode: 'screen'
//   });

export default class App extends Component {

  // componentDidMount() {

  //   this.timer = setTimeout(() => {

  //   }, 2000);
  // }

  // componentWillUnmount() {
  //   if (this.timer) {
  //     this.timer.
  //   }
  // }


  render() {
    return (
      <Main />
    );
  }
}
