/**
 * 睡眠指定时间
 *
 * @return {fucntion}
 */
const sleep = delay => new Promise(resolve => setTimeout(resolve, delay))

export default sleep
