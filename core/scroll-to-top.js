/**
 * 回到顶部动画
 *
 * @param {Number} scrollY 获取顶部的距离，默认值 0
 * @param {Number} time 动画时长，默认值 200 毫秒
 * @return {Null}
 */

const scrollToTop = function (scrollY = 0, time = 200) {
  if (!time) {
    document.body.scrollTop = document.documentElement.scrollTop = scrollY
    return scrollY
  }
  const spacingTime = 20
  let spacingInex = time / spacingTime
  let nowTop = document.body.scrollTop + document.documentElement.scrollTop
  let everTop = (scrollY - nowTop) / spacingInex

  let scrollTimer = setInterval(() => {
    if (spacingInex > 0) {
      spacingInex--
      scrollToTop(nowTop += everTop, 0)
    } else {
      clearInterval(scrollTimer)
    }
  }, spacingTime)
}

export default scrollToTop
