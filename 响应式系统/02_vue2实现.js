// class Dep {
//   constructor() {
//     // new Set() 创建集合
//     this.subscribers = new Set()
//   }
//   addEffect(effect) {
//     this.subscribers.add(effect)
//   }
//   // 通知并调用依赖
//   notify(){
//     this.subscribers.forEach((effect) => {
//       effect()
//     })
//   }
//   // 收集依赖到集合
//   depend(){
//     if(activeEffect){
//       this.subscribers.add(activeEffect)
//     }
//   }
// }
//
//
// // 注册依赖
// let activeEffect = null
// function watchEffect(effect){
//   activeEffect = effect
//   effect()
//   activeEffect = null
// }
//
// // vue2对raw进行数据劫持
// function reactive(raw){
//   Object.keys(raw).forEach(key => {
//     const dep = getDep(raw, key)
//     console.log(dep)
//     let value = raw[key]
//     Object.defineProperty(raw, key, {
//       get() {
//         dep.depend()
//         return value
//       },
//       set(v) {
//         if(v !== value){
//           value = v
//           dep.notify()
//         }
//       }
//     })
//   })
//   return raw
// }
//
// const targetMap = new WeakMap()
// function getDep(target, key){
//   // 根据对象（target）取出对应的Map对象
//   let depsMap = targetMap.get(target)
//   if (!depsMap) {
//     depsMap = new Map()
//     console.log(depsMap)
//     targetMap.set(target, depsMap)
//   }
//   // 取出具体的dep对象
//   let dep = depsMap.get(key)
//   if(!dep) {
//     dep = new Dep()
//     depsMap.set(key, dep)
//   }
//   return dep
// }
//
//
//
// // 测试代码
// const info = {
//   counter: 100,
//   name: 'nonke'
// }
// const foo = {
//   a: 'aaa'
// }
//
// const info = reactive(info)
// const b = reactive(foo)
//
// watchEffect(function(){
//   console.log(info.counter * 2)
// })
// watchEffect(function(){
//   console.log(info.counter * info.counter)
// })
// watchEffect(function(){
//   console.log(info.name)
// })
// watchEffect(function (){
//   console.log(b.a)
// })
//
