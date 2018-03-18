export function observable(target, name, descriptor){
  // 以此可以获取实例化的时候此属性的默认值
  let v = descriptor.initializer && descriptor.initializer.call(this);
  // 返回一个新的描述对象
  return {
      enumerable: true,
      configurable: true,
      get: function() {
          return v;
      },
      set: function(c) {
          v = c;
      }
  }
}
