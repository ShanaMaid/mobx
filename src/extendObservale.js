import { Observable } from '../src/observable';
import { isObject } from "../utils/isObject";
import { isArray } from "../utils/isArray";
import { proxyArray } from './proxyArray';

/**
 * 初始化Observerable
 * @param {object} target 初始化对象
 */
export const initObserverable = (target) => {
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      recurObserverableChildren(target, key)      
    }
  }
}

/**
 * 递归监听Observerable所有后代
 * @param {any} target 监听对象
 * @param {string} name 键名
 */
export const recurObserverableChildren = (target, name) => {
  const objChildren = target[name];
  const observable = new Observable(objChildren);
  Object.defineProperty(target, name, {
    get: function () {
      return observable.get();
    },
    set: function (v) {
      return observable.set(v);
    }
  });
  /**
   * 递归监听类型为对象的后代，类型为数组的后代进行代理
   */
  if (isObject(objChildren)) {
    for (const key in objChildren) {
      if (objChildren.hasOwnProperty(key)) {
        recurObserverableChildren(objChildren, key)
      }
    }
  } else if (isArray(objChildren)) {
    proxyArray(new Observable(objChildren));
  }
}
