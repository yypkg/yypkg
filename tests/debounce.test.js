import debounce from '../release/debounce'

jest.useFakeTimers()

test('模拟高频执行', () => {
  var test = jest.fn()
  var debounced = debounce(test, 1000)

  debounced()
  debounced()

  jest.runAllTimers()

  expect(test).toHaveBeenCalledTimes(1)

})