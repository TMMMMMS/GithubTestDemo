'use strict'

import React from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';

export default class ViewUtils {

    static getRightButton(title, callBack) {

        return (
            <TouchableOpacity
                style={{ alignItems: 'center', }}
                onPress={callBack}>
                <View style={{ marginRight: 10 }}>
                    <Text style={{ fontSize: 16, color: '#1296db', }}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    /**
     * 获取设置页的Item
     * @param callBack 单击item的回调
     * @param icon 左侧图标
     * @param text 显示的文本
     * @param tintStyle 图标着色
     * @param expandableIco 右侧图标
     * @return {XML}
     */
    static getSettingItem(callback, icon, text, tintStyle, expandableIcon) {
        return (
            <TouchableOpacity onPress={callback}>
                <View style={styles.setting_item_container}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: icon }} resizeMethod='resize' style={[{ width: 16, height: 16, marginRight: 10 }, tintStyle]} />
                        <Text>{text}</Text>
                    </View>
                    <Image source={{ uri: expandableIcon ? expandableIcon : 'ic_tiaozhuan' }} style={[{ marginRight: 10, height: 22, width: 22 }, tintStyle]} />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    setting_item_container: {
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
})