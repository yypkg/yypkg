import compareVersion from '../release/compare-version'

test('版本对比的三种情况', () => {
  expect(compareVersion('1.2.3', '0.3.5')).toEqual(1)
  expect(compareVersion('1.2.3', '1.2.3')).toEqual(0)
  expect(compareVersion('1.2.3', '2.3.5')).toEqual(-1)
})