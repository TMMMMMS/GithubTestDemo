'use strict'

import React  from 'react';
import {
    Image,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';

export default class ViewUtils {

    static getRightButton(title,callBack){

        return (
        <TouchableOpacity
            style={{alignItems: 'center',}}
            onPress={callBack}>
            <View style={{marginRight:10}}>
                <Text style={{fontSize: 16,color: '#1296db',}}>{title}</Text>
            </View>
        </TouchableOpacity>
        )
    }
}