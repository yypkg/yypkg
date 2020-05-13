/**
 * 进度控制器
 *
 * @param {Number || Array} from 设置进度起始位置
 * @param {Number || Array} to 设置进度结束位置
 * @param {Number || Array} increment 每次更新的递增量
 * @param {Number || Array} rate 更新频率，即多久更新一次，单位ms
 * @return {Function} ProgressController
 */

let timer: any = 0

// 事件定义
const emptyFn = () => 0
const $onEvent: {[key: string]: Function} = {
  process: emptyFn,
  complete: emptyFn,
  pause: emptyFn,
  stop: emptyFn,
  reset: emptyFn,
  beforeDestroy: emptyFn,
  destroyed: emptyFn
}

class ProgressController {
  private config: any
  private data: any

  public constructor (argument: any) {
    this.init(argument)
  }

  private init (config: any) {
    // 默认配置
    const defaults = {
      from: 0,
      to: 100,
      increment: 1,
      rate: 100
    }
    const configs = this.config = Object.assign(defaults, config)
    this.data = {
      from: configs.from,
      next: {
        from: configs.from,
        callback: null,
        increment: configs.increment,
        rate: configs.rate,
        status: 1
      },
      status: 0
    }
  }

  private progress (option: any, callback?: Function) {
    const data = this.data
    const currentFrom = data.from
    const optionFrom = option.from
    timer = setTimeout(() => {
      if (currentFrom + option.increment >= optionFrom) {
        data.from = optionFrom
        $onEvent.process(data.from)
        window.clearTimeout(timer)
        data.next.status = 1
        if (optionFrom === 100) {
          $onEvent.complete(data.from)
        }
        callback && callback(data.from)
      } else {
        data.from += option.increment
        $onEvent.process(data.from)
        this.progress(option, callback)
      }
    }, option.rate)
  }

  public add (option: any, callback?: Function) {
    const config = this.config
    const data = this.data
    const next = data.next
    option = this.randomOption(option)
    const prevFrom = option.from

    // ended
    if (data.status === 1) return

    window.clearTimeout(timer)
    if (next.status === 0) {
      $onEvent.pause(data)
      next.status = 1
    }

    if (next.from + prevFrom > config.to) { // 对超出部分裁剪对齐
      next.from = config.to
    } else {
      next.from += prevFrom
    }
    next.callback = callback
    next.increment = option.increment || config.increment
    next.rate = option.rate || config.rate
    next.status = 0

    const nextOption = {
      from: next.from,
      increment: next.increment,
      rate: next.rate
    }
    this.progress(nextOption, next.callback)
    if (data.status === 2) { // complete
      data.status = 1 // 完成后，锁住add方法
    }
  }

  public go (option: any, callback?: Function) {
    const data = this.data
    option = this.randomOption(option)
    option.from -= data.from
    this.add(option, callback)
  }

  // 开始
  public start (option: any) {
    const opts = [
      {
        from: this.randomNumber(80, 88),
        rate: 1000 / 35
      },
      {
        from: this.randomNumber(6, 8),
        rate: 600
      }
    ]
    opts[0] = Object.assign(opts[0], option)
    this.go(opts[0], () => {
      this.add(opts[1], undefined)
    })
  }

  // 完成
  public complete (callback?: Function) {
    const { increment } = this.data.next
    const option = {
      from: 100,
      increment,
      rate: 1000 / 35
    }
    this.data.status = 2
    window.clearTimeout(timer)
    this.go(option, callback)
  }

  // 终止
  public stop (callback?: Function) {
    const currentProgress = this.data.from
    this.data.status = 1
    window.clearTimeout(timer)
    $onEvent.stop(currentProgress)
    callback && callback(currentProgress)
  }

  public reset (callback?: Function) {
    const config = this.config
    window.clearTimeout(timer)
    this.data = {
      from: config.from,
      next: {
        from: config.from,
        callback: null,
        increment: config.increment,
        rate: config.rate,
        status: 1
      },
      status: 0
    }
    timer = 0
    $onEvent.reset(this.data.from)
    // $onEvent.process(this.data)
    callback && callback(this.data.from)
  }

  public destroy (callback?: Function) {
    $onEvent.beforeDestroy(this.data.from)
    window.clearTimeout(timer)
    callback && callback()
    this.config = null
    this.data = null
    timer = 0
    $onEvent.destroyed()
  }

  private randomOption (option: any) {
    for (const i in option) {
      if (typeof option[i] === 'object') {
        const times = option[i][1] - option[i][0]
        const offset = option[i][0]
        option[i] = Math.random() * times + offset
      }
    }
    return option
  }

  private randomNumber (start: number, end: number) {
    return Math.floor(Math.random() * (end - start) + start)
  }

  public $on (type: string, fun: (...options: any) => void) {
    $onEvent[type] = fun
  }
}

export default ProgressController
