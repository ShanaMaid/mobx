import { isObject } from "../utils/isObject";
import { initObserverable } from "./extendObservale";
import { Observable } from "./observable";
import { isArray } from "../utils/isArray";
import { proxyArray } from "./proxyArray";
import { Computed } from "./computed";
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

export function computed(target, name, descriptor) {
  const getter = descriptor.getter; // computed对象的get方法，用于依赖收集
  const computed = new Computed(target, getter);
  return {
    enumerable: true,
    configurable: true,
    get: function() {
      return computed.get();
    },
  };
}

/**
 * action 修饰会引起observable变化的动作
 * @param {*} target 
 * @param {*} name 
 * @param {*} descriptor 
 */
export function action(target, name, descriptor) {
  return descriptor;
}


/**
 * observer重写react的componentWillMount方法
 * 通过autorun封装render方法
 * 当render方法执行的时候会启动observable内部的依赖收集
 * 当依赖对象值变动时autorun执行render、forceUpdate进行视图强制刷新
 */
const ReactMixin = {
  componentWillMount: function() {
    autorun(() => {
      this.render();
      this.forceUpdate();
    });
  }
};

export function observer(target) {
  const targetCWM = target.prototype.componentWillMount;
  target.prototype.componentWillMount = function() {
      targetCWM && targetCWM.call(this);
      ReactMixin.componentWillMount.call(this);
  };
}
