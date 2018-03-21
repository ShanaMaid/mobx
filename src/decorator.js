import { isObject } from "../utils/isObject";
import { initObserverable } from "./extendObservale";
import { Observable } from "./observable";
import { isArray } from "../utils/isArray";
import { proxyArray } from "./proxyArray";
/**
 * 监听
 * @param {object} target 
 * @param {string} name 
 * @param {object} descriptor 
 */
export function observable(target, name, descriptor){
  // 以此可以获取实例化的时候此属性的默认值
  let v = descriptor.initializer && descriptor.initializer.call(this);
  
  const observable = new Observable(v);
  if (isObject(v)) {
    initObserverable(v);
  } else if (isArray(v)) {
    proxyArray(observable);
  }
  // 返回一个新的描述对象
  return {
      enumerable: true,
      configurable: true,
      get: function() {
        return observable.get();
      },
      set: function(v) {
        return observable.set(v);
      }
  }
}
