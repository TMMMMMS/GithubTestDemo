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

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showWelcome: true
    }
  }

  // componentDidMount() {

  //   this.timer = setTimeout(() => {
  //     this.setState({
  //       showWelcome: false
  //     })
  //   }, 2000);
  // }

  // componentWillUnmount() {
  //   if (this.timer) {
  //     clearInterval(this.timer);
  //   }
  // }

  render() {
    return (
      <Main />
      // this.state.showWelcome ?
      //   <Welcome /> :
      //   <Main />
    );
  }
}
