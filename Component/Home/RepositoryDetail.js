
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import WebViewTest from '../../Common/WebViews';
import FavoriteDao from '../../expand/dao/FavoriteDao';
import NaviBar from 'react-native-pure-navigation-bar';

export default class RepositoryDetail extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.favoriteDao = new FavoriteDao(props.navigation.state.params.flag);
        this.state = {
            isFavorite: props.navigation.state.params.item.item.isFavorite,
            favoriteIcon: props.navigation.state.params.item.item.isFavorite ? 'ic_star_navbar' : 'ic_unstar_navbar'
        }
    }

    renderRightItem() {

        return (
            <View>
                <TouchableOpacity style={{ width: 44, height: 44, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => this.onRightButtonClick()}
                >
                    <Image
                        source={{ uri: this.state.favoriteIcon }}
                        style={{ width: 20, height: 20, tintColor: this.state.isFavorite ? '#1296db' : null }}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    onRightButtonClick() {

        let isFavorite = !this.state.isFavorite;
        let item = this.props.navigation.state.params.item.item.item;
        let key = item.fullName ? item.fullName : item.id.toString();

        if (isFavorite) {
            this.favoriteDao.saveFavoriteItem(key, JSON.stringify(item));
        } else {
            this.favoriteDao.removeFavoriteItem(key);
        }

        this.updateState({
            isFavorite:isFavorite,
            favoriteIcon: isFavorite ? 'ic_star_navbar' : 'ic_unstar_navbar'
        });
        this.props.navigation.state.params.callback('返回的数据');
    }

    updateState(dic) {
        if (!this) return;
        this.setState(dic);
    }

    render() {

        let title = this.props.navigation.state.params.item.item.item.full_name ? this.props.navigation.state.params.item.item.item.full_name : this.props.navigation.state.params.item.item.item.fullName;

        return (
            <View style={styles.container}>
                <NaviBar
                    title={title}
                    rightElement={this.renderRightItem()}
                />
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