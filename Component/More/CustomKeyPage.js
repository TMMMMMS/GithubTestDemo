
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import LanguageDao, { FLAG_LANGUAGE } from '../../expand/dao/LanguageDao';

class RightItem extends Component {

    constructor(props) {
        super(props);
        this.onSave = this.onSave.bind(this);
    }

    onSave() {
        alert('保存了');
    }

    render() {
        return (
            <TouchableOpacity style={{ flex: 1, paddingRight: 15 }} onPress={this.onSave}>
                <Text style={{ fontSize: 16, color: '#1296db' }}>保存</Text>
            </TouchableOpacity>
        );
    }
}

class BackImage extends React.Component { //创建一个返回按钮的组件
    render() {
        return (
            <TouchableOpacity style={{ flex: 1, marginLeft: 15 }}>
                <Image
                    source={{ uri: 'ic_arrow_back_white_36pt' }}
                    style={{ width: 15, height: 15, tintColor: '#1296db' }}
                />
            </TouchableOpacity>
        );
    }
}

export default class CustomKeyPage extends Component {
    static navigationOptions = {
        title: '自定义标签',
        headerBackTitle: null,
        headerRight: <RightItem />,
        headerBackImage: <BackImage />
    };

    constructor(props) {
        super(props);
        this.state = {
            dataArray: []
        }
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    }

    componentDidMount() {
        this.loadData();
    }

    renderView() {
        // if (!this.state.dataArray || this.state.dataArray.length == 0) {
        //     return;
        // }
        // let len = this.state.dataArray.length;
        // let views = [];
        // for (let i = 0; i < len - 2; i+=2) {
            
            
        // }

        return <Text>{JSON.stringify(this.state.dataArray)}</Text>
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
            </View>
        );
    }

    loadData() {
        this.languageDao.fetch()
            .then(result => {
                this.setState({
                    dataArray: result
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});