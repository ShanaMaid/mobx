import { observable, autorun } from "../src/mopx";

class Shana{
  @observable
  level = 0;
}

const shana = new Shana();
const auto = autorun(() => console.log(shana.level, '我自动执行了'));
// shana.level = 2;

shana.level = {a:{a:{a:{a:1}}}};

shana.level.a.a.a = 1;