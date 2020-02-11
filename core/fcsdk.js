/**
 * 兼容 FIMO SDK 注入时机问题
 */
if (!window.FCSDK && window.FCSDKAndroid) {
  window.FCSDK = function (flag, options, callback, listener) {
    if (!flag) {
      return;
    }
    if (!window.FCSDKAndroid[flag]) {
      console.warn("Android Not Support: " + flag);
      return;
    }
    var uuid = new Date().getTime().toString();
    window.FCSDKAndroid[flag](JSON.stringify({ uuid: uuid, options: options }));
    callback && (window.FCSDK.$native.callback[uuid] = callback);
    listener && (window.FCSDK.$native.listener[uuid] = listener);
  };

  window.FCSDK.$native = {};
  window.FCSDK.$native.callback = {};
  window.FCSDK.$native.listener = {};

  window.FCSDK.$native.onmessage = function (uuid, data) {
    if (window.FCSDK.$native.callback[uuid]) {
      window.FCSDK.$native.callback[uuid](data);
      delete window.FCSDK.$native.callback[uuid];
    }
    if (window.FCSDK.$native.listener[uuid]) {
      window.FCSDK.$native.listener[uuid](data);
    }
  };
}

