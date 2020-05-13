/**
 * 回到顶部动画
 *
 * @param {Number} scrollY 获取顶部的距离，默认值 0
 * @param {Number} time 动画时长，默认值 200 毫秒
 * @return {Null}
 */

const scrollToTop = (scrollY = 0, time = 200): void => {
  if (!time) {
    document.body.scrollTop = document.documentElement.scrollTop = scrollY
    return
  }
  const spacingTime = 20
  let spacingInex = time / spacingTime
  let nowTop = document.body.scrollTop + document.documentElement.scrollTop
  const everTop = (scrollY - nowTop) / spacingInex

  const scrollTimer = setInterval(() => {
    if (spacingInex > 0) {
      spacingInex--
      scrollToTop(nowTop += everTop, 0)
    } else {
      clearInterval(scrollTimer)
    }
  }, spacingTime)
}

export default scrollToTop
