import yypkg from '../core'
import API from '../core/api'
import createUUID from '../core/create-uuid'
// import isAndroid from '../core/is-android'

const urls: any = {
  test: {
    url: 'http://legox.org/mock/a3e67a40-863c-11e7-9085-0ba4558c07dc',
    method: 'jsonp'
  }
}

const options: any = {
  method: 'GET'
}

const api: any = new API(urls, options)

api.test().then((res: any)=>{
  console.log(res)
})


console.log(createUUID())
// console.log(isAndroid)


const m1 = {
  b: 56,
  c: {
    test: 'xyz',
    data: 999,
    doc: [
      {
        k: 34,
        y: 90
      }
    ]
  }
}
const m2 = {
  b: 436,
  c: {
    test: 'mm3',
    kiss: 888,
    doc: [
      {
        k: 88,
        ppp: 90
      },
      {
        k: 8888,
        y: 6666
      }
    ]
  }
}
console.log(yypkg)
console.log('版本比较：', yypkg.compareVersion('1.2', '3'))
console.log('deepMerge', yypkg.deepMerge(m1, m2))
console.log('生成uuid：', yypkg.createUUID())
console.log('日期格式：', yypkg.dateFormat(new Date(), 'YYYY/MM/DD hh:mm:ss'))
console.log('第一语言：', yypkg.getFirstBrowserLanguage())
console.log('双语：', yypkg.getBilingual())
console.log('IE版本：', yypkg.getIEVersion())
console.log('url参数：', yypkg.getUrlParam('v'))
console.log('设置url参数：', yypkg.setUrlParam('https://www.yy.com/#/detail/4', 'share', 'app'))
console.log('移除url参数：', yypkg.removeUrlParam('https://www.yy.com/?channel=app&share=wechat#/detail/6', 'channel'))
console.log('url路径：', yypkg.getUrlPath())
console.log('userAgent：', yypkg.getUserAgent())
console.log('浏览器厂商：', yypkg.getVendor())
console.log('是否为Android手机：', yypkg.isAndroidPhone)
console.log('是否为Android系统：',yypkg.isAndroid)
console.log('是否为Android平板：',yypkg.isAndroidTablet)
console.log('是否为黑莓系统：',yypkg.isBlackberry)
console.log('是否为chrome：',yypkg.isChrome)
console.log('是否为Edge：',yypkg.isEdge)
console.log('是否为iOS：',yypkg.isiOS)
console.log('是否为iPad：',yypkg.isiPad)
console.log('是否为iPhone：',yypkg.isiPhone)
console.log('是否为iPhone X：',yypkg.isiPhoneX)
console.log('是否为iPod：',yypkg.isiPod)
console.log('是否为移动手机：',yypkg.isMobile)
console.log('是否为QQ浏览器：',yypkg.isQQBrowser)
console.log('是否为Safari：',yypkg.isSafari)
console.log('是否为平板：',yypkg.isTablet)
console.log('在5-15之间：', yypkg.numberRange(10, { min: 5, max: 15 }))
console.log('6按三位数补全0：', yypkg.padZero(6, 3))
console.log('千分位加逗号：', yypkg.thousandsDot(12345678))
console.log('“赏  味期 限 ”去除空格：', yypkg.trimSpace('赏  味期 限'))


yypkg.wechatResetFontSize()

yypkg.sleep(3000).then(()=>{
  console.log('sleep完毕')
})


// window.addEventListener('scroll', yypkg.throttle(() => {
//   console.log(333)
// }, 1000), false)

const debounceButton: any = document.querySelector('.debounce')
const immediate = true
debounceButton && debounceButton.addEventListener('click', yypkg.debounce(() => {
  console.log(`点击了debounce，immediate：${immediate}`)
}, 1000, immediate), false)

const throttleButton: any = document.querySelector('.throttle')
throttleButton && throttleButton.addEventListener('click', yypkg.throttle(() => {
  console.log('点击了throttle')
}, 1000), false)

const scriptUrl = 'https://polyfill.io/v3/polyfill.min.js'
const styleUrl = 'https://gstatic.gitbook.com/css/6c3c9dec9383137845be0f0ea2cf1bf4.css'

// loadScript
yypkg.loadScript(scriptUrl).then(()=>{
  console.log('loadScript插入完毕')
})

// loadStyle
yypkg.loadStyle(styleUrl).then(()=>{
  console.log('loadStyle插入完毕')
})

// loadStyleText
const cssText = `
  .content {
    font-size: 20px;
  }
`
yypkg.loadStyleText(cssText)

// SourceLoader
console.log('== SourceLoader ==')
const resources = [scriptUrl, styleUrl]
const loader = new yypkg.SourceLoader({
  url: resources,
  retry: 3,
})
loader.start()
loader.$on('process', (total: number, count: number, url: string) => {
  console.log(total, count, url)
})

// ProgressController
const progress = new yypkg.ProgressController({})
progress.start({
  increment: 1,
  rate: 30,
})
progress.$on('process', (n: number) => {
  // console.log('progress进度：', n)
})
progress.complete(()=>{
  console.log('progress加载完毕')
  yypkg.scrollToTop(100, 500)
  console.log('scrollToTop完毕')
})


// Tween
const tween = new yypkg.Tween({
  from: 0,
  to: 100,
  duration: 1500,
  easing: 'easeInOut'
})
tween.$on('process', (value: number) => {
  throttleButton && (throttleButton.style.transform = `translate3d(${value}px, 0px, 0)`)
})
