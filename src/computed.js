import { dependences } from "./dependencesCollector";

let globalComputedId = 1;

/**
 * Computed
 * 根据依赖的observable自动更新结果值
 * 因此不需要提供set方法
 */
class Computed {
  /**
   * 全局唯一的computed id
   */
  id = 1;
  /**
   * 计算值
   */
  value = null;
  /**
   * 依赖对象
   */
  target = null;
  /**
   * computed大的getter方法
   */
  getter = null;
  /**
   * 是否进行过一次依赖初始化绑定
   */
  isBindDependences = false;

  constructor (target, getter) {
    this.id = `computed-${++globalComputedId}`;
    this.target = target;
    this.getter = getter;
  }

  computeValue () {
    this.value = this.getter.call(this.target); // 计算值
    dependences.dependencesTrigger(this.id);
  }

  get() {
    this.bindComputedDependences();
    dependences.dependencesCollecting();
    return this.value;
  }

  bindComputedDependences () {
    if (!this.isBindDependences) {
      this.isBindDependences = true; // computed依赖只能绑定一次

      // 这个地方等同于一个autorun 
      dependences.dependencesCollectStart(this.getter, this.target); // 开始收集依赖
      this.computeValue();
      dependences.dependencesCollectEnd(); // 依赖收集结束

    }
  }
}