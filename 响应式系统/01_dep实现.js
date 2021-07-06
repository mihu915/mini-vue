class Dep {
  constructor() {
    // new Set() 创建集合
    this.subscribers = new Set()
  }
  subContent(){
    console.log(this.subscribers)
  }
  addEffect(effect) {
    this.subscribers.add(effect)
  }
  notify(){
    this.subscribers.forEach((effect) => {
      effect()
    })
  }
}

const info = {
  counter: 100
}

function doubleCounter(){
  console.log(info.counter * 2)
}
function powerCounter(){
  console.log(info.counter * info.counter)
}


const dep = new Dep()

dep.addEffect(doubleCounter)
dep.addEffect(powerCounter)

info.counter++

dep.notify()
