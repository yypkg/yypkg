/**
 * 进度控制器
 *
 * @param {Number || Array} from 设置进度起始位置
 * @param {Number || Array} to 设置进度结束位置
 * @param {Number || Array} increment 每次更新的递增量
 * @param {Number || Array} rate 更新频率，即多久更新一次，单位ms
 * @return {Function} ProgressController
 */

class ProgressController {
  private config: any
  private data: any
  private timer: any = 0

  // 事件定义
  private $onEvent: {[key: string]: (...options: any) => void} = {
    process: () => 0,
    complete: () => 0,
    pause: () => 0,
    stop: () => 0,
    reset: () => 0,
    beforeDestroy: () => 0,
    destroyed: () => 0
  }

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

  private progress (option: any, callback?: (...options: any) => void) {
    const data = this.data
    const currentFrom = data.from
    const optionFrom = option.from
    this.timer = setTimeout(() => {
      if (currentFrom + option.increment >= optionFrom) {
        data.from = optionFrom
        this.$onEvent.process(data.from)
        window.clearTimeout(this.timer)
        data.next.status = 1
        if (optionFrom === 100) {
          this.$onEvent.complete(data.from)
        }
        callback && callback(data.from)
      } else {
        data.from += option.increment
        this.$onEvent.process(data.from)
        this.progress(option, callback)
      }
    }, option.rate)
  }

  public add (option: any, callback?: (...options: any) => void) {
    const config = this.config
    const data = this.data
    const next = data.next
    option = this.randomOption(option)
    const prevFrom = option.from

    // ended
    if (data.status === 1) return

    window.clearTimeout(this.timer)
    if (next.status === 0) {
      this.$onEvent.pause(data)
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

  public go (option: any, callback?: (...options: any) => void) {
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
  public complete (callback?: (...options: any) => void) {
    const { increment } = this.data.next
    const option = {
      from: 100,
      increment,
      rate: 1000 / 35
    }
    this.data.status = 2
    window.clearTimeout(this.timer)
    this.go(option, callback)
  }

  // 终止
  public stop (callback?: (...options: any) => void) {
    const currentProgress = this.data.from
    this.data.status = 1
    window.clearTimeout(this.timer)
    this.$onEvent.stop(currentProgress)
    callback && callback(currentProgress)
  }

  public reset (callback?: (...options: any) => void) {
    const config = this.config
    window.clearTimeout(this.timer)
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
    this.timer = 0
    this.$onEvent.reset(this.data.from)
    // this.$onEvent.process(this.data)
    callback && callback(this.data.from)
  }

  public destroy (callback?: (...options: any) => void) {
    this.$onEvent.beforeDestroy(this.data.from)
    window.clearTimeout(this.timer)
    callback && callback()
    this.config = null
    this.data = null
    this.timer = 0
    this.$onEvent.destroyed()
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
    this.$onEvent[type] = fun
  }
}

export default ProgressController
