import createUUID from '../release/create-uuid'

test('生成uuid', () => {
  expect(createUUID()).toHaveLength(6)
})