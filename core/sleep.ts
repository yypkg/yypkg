/**
 * 睡眠指定时间
 *
 * @param {Number} delay 睡眠时间
 * @return {Promise}
 */

const sleep = (delay: number): Promise<Record<string, unknown>> => {
  return new Promise(resolve => setTimeout(resolve, delay))
}

export default sleep
