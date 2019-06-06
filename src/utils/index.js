function debounce(fn, wait, immediately) {
  let timer
  return function debouncedFun() {
    const callNow = immediately && !timer

    if (callNow) {
      fn.apply(this, arguments)
    }

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      timer = null
      fn.apply(this, arguments)
    }, wait)
  }
}

function throttle(fn, wait) {
  let lastTime
  let timer

  return function() {
    const now = +new Date()
    // 每次触发时需要更新剩余时间防止两次执行的间隔远大于wait
    const remaining = lastTime ? lastTime + wait - now : 0
    clearTimeout(timer)

    if (remaining > 0) {
      timer = setTimeout(() => {
        lastTime = now
        fn.apply(this, arguments)
      }, remaining)
    } else {
      lastTime = now
      fn.apply(this, arguments)
    }
  }
}
