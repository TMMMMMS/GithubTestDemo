

import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import keys from '../../res/keys.json';
import LangsData from '../../res/langs.json';

export var FLAG_LANGUAGE = {flag_language:'flag_language_language', flag_key:'flag_language_key'};

export default class DataRepository {

    constructor(flag) {
        this.flag = flag;
    }

    fetch() {

        return new Promise((resolve, rejcet) => {
            AsyncStorage.getItem(this.flag, (error,result) =>{
                if (error) {
                    rejcet(error);
                } else {
                    if (result) {
                        try {
                            resolve(JSON.parse(result));
                        } catch(e) {
                            rejcet(e);
                        }
                    } else {
                        var data = this.flag === FLAG_LANGUAGE.flag_key ? keys : LangsData;
                        this.save(data);
                        resolve(JSON.parse(data));
                    }
                }
            })
        })
    }

    save(data) {
        AsyncStorage.setItem(this.flag, JSON.stringify(data), error=>{

        })
    }
}