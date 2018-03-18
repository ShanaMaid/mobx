import {isObject} from '../utils/isObject';
import {deepClone} from '../utils/deepClone';

const globalObjId = 1; // 监听对象全局唯一id

/**
 * observable
 * 阉割版，只支持监听object对象
 */
export function observable(target) {
  if (!isObject(target)) {
    return -1;
  }
  const obj = deepClone(target);
  // 遍历对象
  Object.keys(obj).forEach(function (index) {
    const key = index;
    const val = obj[key];
    observable(val);  // 递归查询建立监听机制
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: false,
      get: function () {
        return val;
      },
      set: function (newVal) {
        if (newVal === obj[key]) {
          return;
        }
        return -1;
      }
    });
  });
  return obj;
}
