
import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

export default class AboutPage extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    getParallaxRenderConfig(params) {
        let config = {};

        config.renderBackground = () => {
            <View key="background">
                <Image source={{
                    uri: params.backgroundImg,
                    width: window.width,
                    height: PARALLAX_HEADER_HEIGHT
                }} />
                <View style={{
                    position: 'absolute',
                    top: 0,
                    width: window.width,
                    // backgroundColor: 'rgba(0,0,0,.4)',
                    backgroundColor : 'red',
                    height: PARALLAX_HEADER_HEIGHT
                }} />
            </View>
        };
        config.renderForeground = () => {
            <View key="parallax-header" style={styles.parallaxHeader}>
                <Image style={styles.avatar} source={{
                    uri: params.avatar,
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE
                }} />
                <Text style={styles.sectionSpeakerText}>
                    {params.name}
                </Text>
                <Text style={styles.sectionTitleText}>
                    {params.description}
                </Text>
            </View>
        };
        config.renderStickyHeader = () => {
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{params.name}</Text>
            </View>
        };
        config.renderFixedHeader = () => {
            <View key="fixed-header" style={styles.fixedSection}>
                <Text style={styles.fixedSectionText}
                    onPress={() => this.refs.ListView.scrollTo({ x: 0, y: 0 })}>
                    Scroll to top
                </Text>
            </View>
        }

        return config;
    }

    renderView(params) {
        let renderConfig = this.getParallaxRenderConfig(params);
        return (
            <ParallaxScrollView
                headerBackgroundColor="#DC143C"
                stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                backgroundSpeed={10}
                {...renderConfig}
            />
        )
    }

    render() {

        return this.renderView({
            name : 'Github Popular',
            description : 'This component now uses Native Driver by default. Remember to pass a Animated component to renderScrollComponent, by default it has Animated.ScrollView',
            avatar : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547835728041&di=c84d95c5d859472d34dad58b04596518&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F16%2F42%2F96%2F56e58PICAu9_1024.jpg',
            backgroundImg : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547835729714&di=2695b563db774904d6ba817130be2764&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_jpg%2FWKtM9X8hT27aL2fYibNNviassVFYXZSViaEDDvicL44xzEelq1sou64jeySKicu8GGyj95PAAibdzLD4eQZiaWCmUPGPw%2F640%3Fwx_fmt%3Djpeg'
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        width: 300,
        justifyContent: 'flex-end'
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 5
    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
    }
});