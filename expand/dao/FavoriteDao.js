

import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

const FAVORITE_KEY_PREFIX = 'favorite_';
export default class FavoriteDao {

    constructor(flag) {
        this.flag = flag;
        this.favoriteKey = FAVORITE_KEY_PREFIX + flag;
    }

    // 收藏项目，保存收藏的项目
    saveFavoriteItem(key, value, callback) {
        AsyncStorage.setItem(key, value, (error) =>{
            if (!error) {
                this.updateFavoriteKeys(key, true);
            }
        })
    }

    // 取消收藏
    removeFavoriteItem(key) {
        AsyncStorage.removeItem(key, error=>{
            if (!error) {
                this.updateFavoriteKeys(key, false);
            }
        })
    }

    getFavorites() {
        return new Promise ((resolve, reject) => {
            AsyncStorage.getItem(this.favoriteKey,(error,result)=>{
                if (!error) {
                    try{
                        resolve(JSON.parse(result));
                    }catch(e) {
                        reject(e);
                    }
                } else {
                    reject(error);
                }
            })
        })
    }

    // 更新favoriteKey集合 
    updateFavoriteKeys(key, isAdd) {
        AsyncStorage.getItem(this.favoriteKey, (error, result)=>{
            if (!error) {
                var favoriteKeys = [];
                if (result) {
                    favoriteKeys = JSON.parse(result);
                }
                var index = favoriteKeys.indexOf(key);
                if (isAdd) {
                    if (index === -1) {
                        favoriteKeys.push(key);
                    }
                } else {
                    if (index !== -1) {
                        favoriteKeys.splice(index,1);
                    }
                }
                AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys))
            }
        })
    }
}