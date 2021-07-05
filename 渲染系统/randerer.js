const h = (tag, props, children) => {
  return {
    tag,
    props,
    children
  }
}

const mount = (vnode, container) => {

  const { tag, props, children } = vnode

  const el = vnode.el = document.createElement(tag)

  if(props){
    if(typeof props === 'object'){
      for (let key in props){
        const value = props[key]
        if(key.startsWith('on')) {
          // toLowerCase()方法转小写
          // slice()方法从第几个字符切除
          el.addEventListener(key.slice(2).toLowerCase(), value)
        }else {
          // el.setAttribute()为元素设置属性和值
          el.setAttribute(key, value)
        }
      }
    }else {
      throw new Error('参数props必须是一个对象。')
    }

  }
  if(children){
    if(typeof children === 'string'){
      el.textContent = children
    }else {
      children.forEach((child) => {
        mount(child, el)
      })
    }
  }
  container.appendChild(el)
}


const patch = (n1, n2) => {
  const el = n2.el = n1.el
  if(n1.tag === n2.tag){

    // 处理 props
    const newProps = n2.props
    const oldProps = n1.props

    for(const key in newProps){
      const newValue = newProps[key]
      const oldValue = oldProps[key]

      if(oldValue !== newValue){
        if(key.startsWith('on')) {
          // toLowerCase()方法转小写
          // slice()方法从第几个字符切除
          // 添加事件事件
          el.addEventListener(key.slice(2).toLowerCase(), newProps[key])

        }else {
          // el.setAttribute()为元素设置属性和值
          el.setAttribute(key, newValue)

        }
      }
    }

    for (const key in oldProps){
      if(!newProps[key]){
        if(key.startsWith('on')) {
          // toLowerCase()方法转小写
          // slice()方法从第几个字符切除
          // 删除事件
          el.removeEventListener(key.slice(2).toLowerCase(), oldProps[key])
        }else {
          // el.setAttribute()为元素删除属性和值
          el.removeAttribute(key)
        }
      }
    }

    // 处理children
    if(typeof n2.children === 'string'){
      el.textContent = n2.children
    }else {

    }


  }else {
    const n1Parent = n1.el.parentElement
    n1Parent.removeChild(n1.el)
    mount(n2, n1Parent)
  }
}