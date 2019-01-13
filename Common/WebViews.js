
import React, { Component } from 'react';
import { WebView, View, StyleSheet } from 'react-native';

const URL = 'https://www.baidu.com';
const TRENDING_URL = 'https://github.com/';

export default class WebViewTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: props.navigation.state.params.item.item.item.html_url ? props.navigation.state.params.item.item.item.html_url :TRENDING_URL+ props.navigation.state.params.item.fullName,
            canGoBack:false,
        }
    }

    search() {
        this.setState({
            url:this.searchText
        })
    }
    onNavigationStateChange(e){
        this.setState({
            canGoBack: e.canGoBack,
            url: e.url,
        });
    }
    goBack(){
        if(this.state.canGoBack){
            this.webView.goBack();
        }else {
            this.props.navigation.goBack();
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <WebView
                    ref={webView => this.webView = webView}
                    onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
                    source={{ uri: this.state.url }}
                    startInLoadingState={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    button: {
        fontSize: 16,
        padding: 5
    },
    input: {
        borderWidth: 1,
        height: 40,
        flex: 1,
        marginLeft: 5
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        marginLeft: 0
    }
}
)