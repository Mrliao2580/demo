/*
 * @Author: lzh
 * @Date: 2023-04-19 17:32:52
 * @LastEditors: lzh
 * @LastEditTime: 2023-04-20 10:05:51
 * @Description: file content
 */
let obj = {
  num: 123,
  str: 'abc',
  bool: true,
  null: null,
  NaN: NaN,
  Symbol: Symbol(123),
  undefined: undefined,
  function: function () { },
  arr: [1, 2, 3]
}

function deepClone (target) {
  if (typeof target == 'object' && target != null) {
    let obj = Array.isArray(target) ? [] : {};
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        if (target[key] && typeof target[key] == 'object') {
          obj[key] = deepClone(target[key])
        } else {
          obj[key] = target[key]
        }
      }
    }
    return obj
  } else {
    return target
  }
}

let b = deepClone(obj)
console.log(123, b);



function deepClone (target) {
  if (typeof target == 'object' || target == null) {
    return target
  }
  let obj = Array.isArray(target) ? [] : {};
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      obj[key] = deepClone(target[key])
    }
  }
  return obj
}