import { isObject } from "../utils/isObject";
import { initObserverable } from "./extendObservale";
import { Observable } from "./observable";
/**
 * 监听
 * @param {object} target 
 * @param {string} name 
 * @param {object} descriptor 
 */
export function observable(target, name, descriptor){
  // 以此可以获取实例化的时候此属性的默认值
  let v = descriptor.initializer && descriptor.initializer.call(this);
  if (isObject(v)) {
    initObserverable(v);
  }
  const observable = new Observable(v);
  // 返回一个新的描述对象
  return {
      enumerable: true,
      configurable: true,
      get: function() {
          return observable.get();
      },
      set: function(v) {
        /**
         * 如果新设定的值为对象，继续observer包装一下
         */
        if (isObject(v)) {
          initObserverable(v);
        }
        return observable.set(v);
      }
  }
}
