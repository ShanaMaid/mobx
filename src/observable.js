
let globalObjId = 1; // 监听对象全局唯一id

export class Observable{
  uniqueId = 1; //  全局唯一id

  value = null; // 观测值

  constructor(v) {
    this.uniqueId = `observer-${globalObjId++}`;

    this.value = v;
  }

  /**
   * getter
   */
  get () {
    return this.value;
  }

  /**
   * setter
   * @param {new} v 
   */
  set (v) {
    this.value = v;
  }
}
