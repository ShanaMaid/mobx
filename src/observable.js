import { dependences } from "./dependencesCollector";
let globalObjId = 1; // 监听对象全局唯一id

export class Observable{
  id = 1; //  全局唯一id

  value = null; // 观测值

  constructor(v) {
    this.id = `observer-${globalObjId++}`;

    this.value = v;
  }

  /**
   * getter
   */
  get () {
    dependences.dependencesCollecting(this.id);
    return this.value;
  }

  /**
   * setter
   * @param {any} v 
   */
  set (v) {
    this.value = v;
    dependences.dependencesTrigger(this.id);
  }
}
