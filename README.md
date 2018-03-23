# mopx
## 关于mopx
mopx是对mobx的阉割版实现，提供`autorun`、`observable`、`computed`

## 原理解析
### observable
![observable原理图](./pic/observable.png)

### autorun
![autorun原理图](./pic/autorun.png)

### computed

### dependencesCollector
![dependencesCollector原理图](./pic/dependences.png)

## 运行测试用例
```
npm run test
```

## mopx借鉴过的资料
很大程序上借鉴了[@芋头君](https://github.com/xinyu198736)的[s-mobx](https://github.com/xinyu198736/s-mobx)

- [mobx官方源码](https://github.com/mobxjs/mobx)
- [如何自己实现一个 mobx - 原理解析](https://zhuanlan.zhihu.com/p/26559530)
- [mobx源码解读1](https://www.cnblogs.com/rubylouvre/p/6058045.html)
- [mobx源码解读2](https://www.cnblogs.com/rubylouvre/p/6058575.html)
- [mobx源码解读4](https://www.cnblogs.com/rubylouvre/p/6059216.html)

在此特别感谢以上各位提供的帮助，感谢对开源社区的贡献！
