/**
 * 进度控制器
 *
 * @param {Number || Array} from 设置进度起始位置
 * @param {Number || Array} to 设置进度结束位置
 * @param {Number || Array} increment 每次更新的递增量
 * @param {Number || Array} rate 更新频率，即多久更新一次，单位ms
 * @return {Function} ProgressController
 */

let timer = 0

// 事件定义
let $onEvent = {
  process: () => {},
  complete: () => {},
  pause: () => {},
  ended: () => {},
  reset: () => {},
  beforeDestroy: () => {},
  destroyed: () => {},
}

let Progress = class ProgressController {

  constructor (argument) {
    this.init(argument)
  }

  init (config) {
    // 默认配置
    let defaults = {
      from: 0,
      to: 100,
      increment: 1,
      rate: 100,
    }
    let configs = this.config = Object.assign(defaults, config)
    this.data = {
      progress: configs.from,
      next: {
        progress: configs.from,
        callback: null,
        increment: configs.increment,
        rate: configs.rate,
        status: 1
      },
      status: 0
    }
  }

  progress (option, callback) {
    let data = this.data
    let from = data.progress
    timer = setTimeout(() => {
      if (from + option.increment >= option.progress) {
        data.progress = option.progress
        $onEvent.process(data.progress)
        window.clearTimeout(timer)
        data.next.status = 1
        if (option.progress === 100) {
          $onEvent.complete(data.progress)
        }
        callback && callback(data.progress)
      }
      else {
        data.progress += option.increment
        $onEvent.process(data.progress)
        this.progress(option, callback)
      }
    }, option.rate)
  }

  add (option, callback) {
    let config = this.config
    let data = this.data
    let next = data.next
    option = this.randomOption(option)
    let prevProgress = option.progress

    // ended
    if (data.status === 1) return

    window.clearTimeout(timer)
    if (next.status === 0) {
      $onEvent.pause(data)
      next.status = 1
    }
    if (next.progress + prevProgress > config.to) { // 对超出部分裁剪对齐
      next.progress = config.to
    }
    else {
      next.progress += prevProgress
    }
    next.callback = callback
    next.increment = option.increment || config.increment
    next.rate = option.rate || config.rate
    next.status = 0

    let nextOption = {
      progress: next.progress,
      increment: next.increment,
      rate: next.rate,
    }
    this.progress(nextOption, next.callback)
    if (data.status === 2) { // complete
      data.status = 1 // 完成后，锁住add方法
    }
  }

  go (option, callback) {
    let data = this.data
    option = this.randomOption(option)
    option.progress = option.progress - data.progress

    this.add(option, callback)
  }

  complete (callback) {
    let {increment, rate} = this.data.next
    let option = {
      progress: 100,
      increment,
      rate,
    }
    this.data.status = 2
    window.clearTimeout(timer)
    this.go(option, callback)
  }

  end (callback) {
    let currentProgress = this.data.progress
    this.data.status = 1
    window.clearTimeout(timer)
    $onEvent.ended(currentProgress)
    callback && callback(currentProgress)
  }

  reset (callback) {
    let config = this.config
    window.clearTimeout(timer)
    this.data = {
      progress: config.from,
      next: {
        progress: config.from,
        callback: null,
        increment: config.increment,
        rate: config.rate,
        status: 1
      },
      status: 0
    }
    timer = 0
    $onEvent.reset(this.data.progress)
    // $onEvent.process(this.data)
    callback && callback(this.data.progress)
  }

  destroy (callback) {
    $onEvent.beforeDestroy(this.data.progress)
    window.clearTimeout(timer)
    callback && callback()
    this.config = null
    this.data = null
    timer = 0
    $onEvent.destroyed()
  }

  randomOption (option) {
    for (let i in option ){
      if (typeof option[i] === 'object') {
        let times = option[i][1] - option[i][0]
        let offset = option[i][0]
        option[i] = Math.random() * times + offset
      }
    }
    return option
  }

  $on (type, fun) {
    $onEvent[type] = fun
  }

}

export default Progress
