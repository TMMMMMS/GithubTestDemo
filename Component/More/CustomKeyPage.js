
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, ScrollView, DeviceEventEmitter, Alert } from 'react-native';
import LanguageDao, { FLAG_LANGUAGE } from '../../expand/dao/LanguageDao';
import CheckBox from 'react-native-check-box';
import ViewUtils from '../../Util/ViewUtils';
import ArrayUtils from '../../Util/ArrayUtils';

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

        title: navigation.state.params.titleName,
        headerBackTitle: null,
        headerRight: ViewUtils.getRightButton(navigation.state.params && navigation.state.params.isRemoveKey ? '移除' : '保存', navigation.state.params ? navigation.state.params.onSave : null),
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
        this.changeValues = [];
        this.flag_key = props.navigation.state.params.flag ? props.navigation.state.params.flag : null;
        this.isRemoveKey = props.navigation.state.params ? props.navigation.state.params.isRemoveKey : null;
        this.state = {
            dataArray: []
        }
        if (!this.flag_key) {
            this.flag_key = FLAG_LANGUAGE.flag_key;
        }
        this.languageDao = new LanguageDao(this.flag_key)
    }

    componentDidMount() {

        this.subscription = DeviceEventEmitter.addListener('xxxName', () => {
            this.onSaveTags();
        });
        this.subscription = DeviceEventEmitter.addListener('popName', () => {
            this.onPop();
        });
        this.props.navigation.setParams({
            onSave: this.onSave
        })
        this.loadData();

    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    onSave() {
        DeviceEventEmitter.emit('xxxName');
    }

    onSaveTags() {
        if (this.changeValues.length === 0) {
            this.props.navigation.goBack();
            return;
        }

        if (this.isRemoveKey) {
            for (let i = 0; i < this.changeValues.length; i++) {
                ArrayUtils.remove(this.state.dataArray, this.changeValues[i]);

            }
        }

        this.languageDao.save(this.state.dataArray);
        this.props.navigation.goBack();
    }

    onPop() {
        if (this.changeValues.length) {
            Alert.alert(
                '提示',
                '是否保存修改?',
                [
                    {
                        text: '取消',
                        onPress: () => { this.props.navigation.goBack() },
                        style: 'cancel'
                    },
                    {
                        text: '确定',
                        onPress: () => {
                            this.onSaveTags()
                        }
                    }
                ],
            )
        } else {
            this.props.navigation.goBack()
        }
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
                isChecked={data.checked}
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

        let dataArray = this.state.dataArray;
        data.checked = !data.checked;

        ArrayUtils.updateArray(this.changeValues, data);
        this.setState({
            dataArray: dataArray
        })
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