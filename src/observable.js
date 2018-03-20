import { dependences } from "./dependencesCollector";
import { isArray } from "../utils/isArray";
import { isObject } from "../utils/isObject";
import { initObserverable } from "./extendObservale";
let globalObjId = 1; // 监听对象全局唯一id

export class Observable{
  id = 1; //  全局唯一id

  value = null; // 观测值

  constructor(v) {
    this.id = `observable-${globalObjId++}`;
    if (isArray(v)) {
      v = this.proxyArr(v);
    }
    this.value = v;
  }

  /**
   * getter
   */
  get() {
    dependences.dependencesCollecting(this.id);
    return this.value;
  }

  /**
   * setter
   * @param {any} v 
   */
  set(v) {
    if (isArray(v)) {
      v = this.proxyArr(v);
    } else if (isObject(v)) {
      initObserverable(v);
    }
    this.value = v;
    dependences.dependencesTrigger(this.id);
  }

  /**
   * 通过proxy代理数组监听push、pop、shift、unshitf等数组操作方法
   * @param {Array} v 数组
   */
  proxyArr(v) {
    return new Proxy(v, {
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
          dependences.dependencesTrigger(this.id);
        }
        return true;
      }
    })
  }
}
