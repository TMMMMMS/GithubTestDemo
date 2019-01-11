
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, ScrollView, DeviceEventEmitter } from 'react-native';
import LanguageDao, { FLAG_LANGUAGE } from '../../expand/dao/LanguageDao';
import CheckBox from 'react-native-check-box';
import ViewUtils from '../../Util/ViewUtils';
import ArrayUtils from '../../Util/ArrayUtils';

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


/*
    static中的this问题
    1.在页面A中的componentDidMount方法，利用参数将方法传递给封装好的控件A，此时this指向的是控件A
        this.props.navigation.setParams({
            onSave: this.onSave,
        })
    2.利用通知机制通知页面A，将this指向页面A，调用页面A内的具体方法
*/

    static navigationOptions = ({ navigation, screenProps }) => ({

        title: '自定义标签',
        headerBackTitle: null,
        headerRight: ViewUtils.getRightButton('保存', navigation.state.params ? navigation.state.params.onSave : null),
        headerBackImage: <BackImage />
    });

    constructor(props) {
        super(props);
        this.changeValues = [];
        this.state = {
            dataArray: [],
            text: "打印了",
        }
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);

    }

    componentDidMount() {

        this.subscription = DeviceEventEmitter.addListener('xxxName',()=>{
            this.onRefresh();
        });
        this.props.navigation.setParams({
            onSave: this.onSave,
        })
        this.loadData();

    }
    
    componentWillUnmount() {
        this.subscription.remove();
    }

    onSave() {
        DeviceEventEmitter.emit('xxxName'); 
    }

    onRefresh() {
        alert(this.state.text);
    }

    renderView() {
        if (!this.state.dataArray || this.state.dataArray.length == 0) {
            return;
        }
        let len = this.state.dataArray.length;
        let views = [];
        for (let i = 0; i < len - 2; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i + 1])}
                    </View>
                    <View style={styles.line}></View>
                </View>
            )
        }
        views.push(
            <View key={len - 1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) :
                        this.renderCheckBox(this.state.dataArray[len - 1])
                    }
                </View>
                <View style={styles.line}></View>
            </View>
        )
        return views;
    }

    renderCheckBox(data) {

        let leftText = data.name;
        return (
            <CheckBox
                style={{ flex: 1, padding: 10 }}
                onClick={() => this.onClick(data)}
                leftText={leftText}
                checkedImage={<Image style={{ width: 25, height: 25, tintColor: '#1296db' }} source={{ uri: 'ic_check_box' }} />}
                unCheckedImage={<Image style={{ width: 25, height: 25, tintColor: '#1296db' }} source={{ uri: 'ic_check_box_outline_blank' }} />}
            />
        )
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

    onClick(data) {
        data.checked = !data.checked;
        ArrayUtils.updateArray(this.changeValues, data);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    line: {
        backgroundColor: 'darkgray',
        height: 0.3,
    },
    item: {
        alignItems: 'center',
        flexDirection: 'row',
    }
});