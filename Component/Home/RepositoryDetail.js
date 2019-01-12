
import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, DeviceEventEmitter } from 'react-native';
import WebViewTest from '../../Common/WebViews';

export default class RepositoryDetail extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.item.full_name ? navigation.state.params.item.full_name : navigation.state.params.item.fullName,
        headerBackTitle: null,
        headerLeft: <View>
            <TouchableOpacity style={{ width: 44, height: 44, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                    DeviceEventEmitter.emit('popName');
                }}
            >
                <Image
                    source={{ uri: 'ic_arrow_back_white_36pt' }}
                    style={{ width: 26, height: 26, tintColor: '#1296db' }}
                />
            </TouchableOpacity>
        </View>
    });

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener('popName', () => {
            this.props.navigation.goBack()
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <WebViewTest {...this.props} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});