import { dependences } from "./dependencesCollector";
import { isArray } from "../utils/isArray";
import { isObject } from "../utils/isObject";
import { initObserverable } from "./extendObservale";
import { proxyArray } from "./proxyArray";
let globalObjId = 1; // 监听对象全局唯一id

export class Observable{
  id = 1; //  全局唯一id

  value = null; // 观测值

  constructor(v) {
    this.id = `observable-${globalObjId++}`;
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
    if (isObject(v)) {
      initObserverable(v);
    }
    if (isArray(v)) {
      this.value = v;
      v = proxyArray(this).getValue();
    } 
    this.value = v;
    dependences.dependencesTrigger(this.id);
  }

  
  /**
   * 对外部暴露手动触发器
   */
  trigger () {
    dependences.dependencesTrigger(this.id);
  }

  /**
   * 对外暴露修改value的方法
   * @param {any} v 修改值
   */
  setValue (v) {
    this.value = v;
  }
  
  /**
   * 对外报漏获取value的方法
   */
  getValue () {
    return this.value;
  }
}
