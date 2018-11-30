/**
 * Mocha 自动化 bdd 测试
 *
 * @param {Function} 测试用例
 * @return {Null}
 */
import stringToDomElement from './string-to-domelement'
import loadStyle from './load-style'
import loadScript from './load-script'
import loadStyleText from './load-style-text'

export default async function (testcases) {
  document.body.appendChild(stringToDomElement('<main id="mocha"></main>'))

  loadStyleText(`main#mocha {position:fixed;top:0;left:0;z-index:999;width:100%;height:100%;margin:0;font-size:14px;background-color:rgba(255, 255, 255, .95);}main#mocha .suite h1 {font-weight:600;}`)

  await loadStyle('https://unpkg.com/mocha@5.2.0/mocha.css')
  await loadScript('https://unpkg.com/mocha@5.2.0/mocha.js')
  await loadScript('https://unpkg.com/chai/chai.js')

  window.mocha.setup('bdd')

  testcases && await testcases()

  window.mocha.run()
}
