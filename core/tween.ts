/**
 * Tween 线性运动函数
 *
 * @param {number} options.from 起始
 * @param {number} options.to 截止
 * @param {number} options.duration 持续时间，ms
 * @method Tween.$on('process', (value) => {}) 动画过程持续触发，返回当前运动位置
 * @method Tween.$on('complete', (value) => {}) 动画结束时触发，返回当前运动位置
 * @return void
 */

class Tween {
  // 事件定义
  private $onEvent: {[key: string]: (...options: any) => void} = {
    process: () => 0,
    complete: () => 0
  }

  // 频率
  private rate = 17

  // 动画计时器
  private start = 0

  // 默认 easeInOut
  private defaultEasing = 'easeInOut'

  // 动画曲线函数
  private easing: {[key: string]: (t: number, b: number, c: number, d: number) => number} = {
    linear: (t, b, c, d) => {
      return c * t / d + b
    },
    easeIn: (t, b, c, d) => {
      return c * (t /= d) * t + b
    },
    easeOut: (t, b, c, d) => {
      return -c * (t /= d) * (t - 2) + b
    },
    easeInOut: (t, b, c, d) => {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b
      return -c / 2 * ((--t) * (t - 2) - 1) + b
    }
  }

  // 构造器
  public constructor (argument: { from: number, to: number, duration: number, easing?: string}) {
    const step = () => {
      const { from, to, duration, easing } = argument
      const animationName = easing ? (this.easing[easing] ? easing : this.defaultEasing) :  this.defaultEasing
      const during = Math.ceil(duration / this.rate)

      // 当前的运动位置
      const currentPosition = this.easing[animationName](this.start, from, to - from, during)
      // 时间递增
      this.start++
      // 如果还没有运动到位，继续
      if (this.start <= during) {
        this.$onEvent.process(currentPosition)
        if (!window.requestAnimationFrame) {
          setTimeout(step, this.rate)
        } else {
          requestAnimationFrame(step)
        }
      } else {
        // 动画结束
        this.start = 0
        this.$onEvent.complete(currentPosition)
      }
    }
    step()
  }

  // 事件注册
  public $on (type: string, fun: (...options: any) => void) {
    this.$onEvent[type] = fun
  }
}

export default Tween
