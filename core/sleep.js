/**
 * 睡眠指定时间
 *
 * @return {Promise}
 */
const sleep = delay => new Promise(resolve => setTimeout(resolve, delay))

export default sleep
