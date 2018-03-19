import { Observable } from '../src/observable';
import { deepClone } from "../utils/deepClone";
import { isObject } from "../utils/isObject";

/**
 * 初始化Observer
 * @param {object} target 初始化对象
 */
export const initObserver = (target) => {
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      createObserverChildren(target, key)      
    }
  }
}

/**
 * 递归监听Observer所有后代
 * @param {any} target 监听对象
 * @param {string} name 键名
 */
export const createObserverChildren = (target, name) => {
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
  if (isObject(objChildren)) {
    for (const key in isObject) {
      if (isObject.hasOwnProperty(key)) {
        createObserverChildren(target, key)
      }
    }
  }
}