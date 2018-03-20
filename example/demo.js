import { observable, autorun } from "../src/mopx";

/**
 * 定义一个人物
 * 具有等级、血量属性
 * 能够打怪、回血、买物品的能力
 * 有背包能存储东西
 */
class Character{
  @observable
  level = 1;

  @observable
  hp = 30;

  @observable
  backpack = ['长剑', '布甲'];

  killMonster() {
    this.level++;
    this.hp-=10;
    return this;
  }

  restoreStatus() {
    this.hp+=20;
    return this;
  }

  buyGoods(name) {
    this.backpack.push(name);
    return this;
  }
}
// 创建一个角色名夏娜
const shana = new Character();

// 实时自动打印信息
const levelUp = autorun(() => {
  console.log(`shana升级了！当前等级${shana.level}`);
});

const hpChange = autorun(() => {
  console.log(`shana血量发生变化，当前血量${shana.hp}`);
});

const backpackChange = autorun(() => {
  console.log(`shana背包发生变化，当前包裹物品:${shana.backpack.join(',')}`);
});

// 这里我们利用autorun制作了一个插件，这样我们只用打挂升级了，当蓝量和血量低于某个值的时候脚本会自动帮我们恢复
const plugin = autorun(() => {
  const hp = 10;
  const mp = 5;
  if (shana.hp <= hp || shana.mp <= mp) {
    console.log('\n=============插件启动=============');
    console.log(`恢复前状态: level:${shana.level}  hp:${shana.hp}`);
    console.log('嗑了一瓶药');
    shana.restoreStatus();
    console.log(`恢复后状态: level:${shana.level}  hp:${shana.hp}`);
    console.log('=============插件结束=============\n');
  }
})

console.log('====================================');
console.log('以上全是autorun第一次收集依赖时候自定自行的打印信息');
console.log('====================================');

// 当我们没有插件的时候，我们需要自己打怪升级的同时注意恢复蓝和血
// shana.killMonster().restoreStatus().killMonster().restoreStatus().killMonster();

// 当使用插件的时候，我们只管一直打怪
// shana.killMonster().killMonster().killMonster().killMonster().killMonster().killMonster().killMonster().killMonster();



shana.backpack.push('盾牌');

// shana.backpack = [1,3,4]

// console.log(shana.backpack)