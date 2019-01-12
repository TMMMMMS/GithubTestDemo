
'use strict';

import GitHubTrending from 'GitHubTrending';

export var FLAG_STORAGE = { flag_popular: 'popular', flag_trending: 'trending' };
export default class DataRepository {

    constructor(flag) {
        this.flag = flag;
        if (flag === FLAG_STORAGE.flag_trending) {
            this.trending = new GitHubTrending();
        }
    }

    fetchNetRepository(url) {
        return new Promise((resolve, reject) => {

            if (this.flag === FLAG_STORAGE.flag_trending) {
                this.trending.fetchTrending(url)
                .then(result=>{
                    if (!result) {
                        reject(new Error('responseData is null'));
                        return;
                    }
                    resolve(result);
                })
                .catch(error=>{
                    reject(error);
                })
            } else {
                fetch(url)
                    .then(response => response.json())
                    .then(result => {
                        resolve(result);
                    })
                    .catch(error => {
                        reject(error);
                    })
            }
        })
    }
}