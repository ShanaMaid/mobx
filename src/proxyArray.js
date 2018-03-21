import { Observable } from '../src/observable';
import { isArray } from "../utils/isArray";
import { isObject } from "../utils/isObject";
import { initObserverable } from "./extendObservale";

/**
 * 代理数组，拦截push、pop、shift等数组操作
 * @param {Observale} observable 监听的实例Observable对象
 */
export const proxyArray = (observable) => {
  observable.setValue(new Proxy(observable.getValue(), {
    set: (target, index, value) => {
      target[index] = value;
      /**
       * 当数组发生变化时，除了对应的值变化外，还会导致length发生变化，所以我们需要判断一下
       * 当length发生变化时不发生trigger，因为length并未计入stack
       * 比如我有一个数组 arr = [1, 2],执行arr.push(3)操作
       * 在此期间proxy会拦截到2次操作，一次时[1, 2] => [1, 2, 3]
       * 还有一次时arr.length由 2  => 3
       */
      if (index !== 'length') {
        // dependences.dependencesTrigger(this.id);
        observable.trigger();
      }
      return true;
    }
  }));
  const value = observable.getValue();
  /**
   * 递归监听类型为对象的后代，类型为数组的后代进行代理
   */
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      const element = value[key];
      if (isArray(element)) {
        proxyArray(new Observable(element));
      } else if (isObject(element)) {
        initObserverable(element);
      }
    }
  }
  return observable;
}
