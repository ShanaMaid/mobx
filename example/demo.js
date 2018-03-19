import { observable } from "../src/mopx";

class Shana{
  @observable
  level = 0;
}

const shana = new Shana();

// shana.level = 2;

shana.level = {a:{a:{a:{a:1}}}};

shana.level.a.a.a = 1;

console.log('====================================')
console.log(shana.level.a.a.a )
console.log('====================================')