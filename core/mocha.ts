/**
 * Mocha 自动化 bdd 测试
 *
 * @param {Function} 测试用例
 * @return {Null}
 */

import stringToDOMElement from './string-to-dom-element'
import loadStyle from './load-style'
import loadScript from './load-script'
import loadStyleText from './load-style-text'

const mocha = async (testcases: any): Promise<any> => {
  document.body.appendChild(stringToDOMElement('<main id="mocha"><i class="close"></i></main>'))

  loadStyleText(`main#mocha {padding-top:45px;position:fixed;top:0;left:0;z-index:999;width:100%;height:100%;margin:0;font-size:14px;background-color:rgba(255, 255, 255, .95);}main#mocha .suite h1 {font-weight:600;}main#mocha i.close {position:absolute;right:20px;bottom:65px;width:40px;height:40px;z-index:1;cursor:pointer;border:3px solid #333}main#mocha i.close::after{position:absolute;right:0;left:0;margin:auto;top:1px;font-size:40px;display:inline-block;content:"×";color:#333;width:30px;height:30px;line-height:30px;text-align:center}`)

  const mochaElement = document.body.querySelector('main#mocha')
  mochaElement && mochaElement.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    target.parentNode && target.parentNode.removeChild(target)
  })

  await loadStyle('https://unpkg.com/mocha@5.2.0/mocha.css')
  await loadScript('https://unpkg.com/mocha@5.2.0/mocha.js')
  await loadScript('https://unpkg.com/chai/chai.js')

  window.mocha.setup('bdd')

  testcases && await testcases()

  window.mocha.run()
}

export default mocha
