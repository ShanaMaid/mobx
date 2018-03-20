/**
 * 依赖收集器
 */
class DependencesCollector {
  // 依赖存储栈
  stack = {};

  // 依赖收集flag
  isCollecting = false;
  
  // 与当前依赖相关联的function
  currentFunc = null;

  // 当前依赖
  currentTarget = null;

  /**
   * 依赖收集 - 开始
   * @param {Function} func 依赖更新时需要执行的函数
   * @param {any} target 监听对象
   */
  dependencesCollectStart(func, target = null) {
    this.isCollecting = true;
    this.currentFunc = func;
    this.currentTarget = target;
  }

  /**
   * 依赖收集 - 进行
   */
  dependencesCollecting (id) {
    if (this.isCollecting) {
      this.stack[id] = this.stack[id] || {};
      this.stack[id].func = this.stack[id].func || [];
      if (this.currentFunc) {
        this.stack[id].func.push(this.currentFunc);
      }
      this.stack[id].target = this.currentTarget;
    }
  }

  /**
   * 依赖收集 - 结束
   */
  dependencesCollectEnd() {
    this.isCollecting = true;
    this.currentFunc = null;
    this.currentTarget = null;
  }

  /**
   * 依赖触发
   * @param {string} id observable对应id
   */
  dependencesTrigger(id) {
    const func = this.stack[id].func;
    const that = this.stack[id].target;
    // 触发与当前依赖相关联的fucntion
    func.forEach(fn => {
      fn.call(that);
    });
  }

}

/**
 * 返回一个依赖实例，全局唯一
 */
export const dependences =new DependencesCollector();