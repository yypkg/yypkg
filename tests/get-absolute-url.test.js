import getAbsoluteUrl from '../release/get-absolute-url'

test('获取绝对路径', () => {
  // global.window = Object.create(window)
  // const url = 'https://www.yy.com/'
  // Object.defineProperty(window, 'location', {
  //   value: {
  //     href: url
  //   }
  // })

  const url = 'http://localhost/undefined'
  expect(getAbsoluteUrl()).toEqual(url)
})