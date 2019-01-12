export default class ArrayUtils {

    // 更新数组，若item已存在，则从数组中移除，否则添加进数组
    static updateArray(array, item) {
        
        for (let i = 0; i < array.length; i++) {
            var temp = array[i];
            if (temp === item) {
                array.splice(i, 1);
                return;
            }
        }
        array.push(item);
    }

    // 复制一个数组
    static clone(from) {
        
        if (!from) {
            return [];
        }

        let newArray = [];
        for (let i = 0; i < from.length; i++) {
            newArray[i] = from[i];
        }
        return newArray;
    }
}