/**
 * 睡眠指定时间
 *
 * @param {Number} delay 睡眠时间
 * @return {Promise}
 */

const sleep = (delay: number): Promise<any> => {
  return new Promise(resolve => setTimeout(resolve, delay))
}

export default sleep
