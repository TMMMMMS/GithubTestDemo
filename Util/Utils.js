export default class Utils {

    // 检查该item是否被收藏
    static checkFavorite(item, items) {
        for (let i = 0; i < items.length; i++) {
            let id = item.id ? item.id.toString() : item.fullName;
            if (id === items[i]) {
                return true;
            }
        }
        return false;
    }
}