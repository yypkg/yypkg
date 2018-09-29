"use strict";function debounce(u,n){var o;return function(){var e=this,t=arguments;clearTimeout(o),o=setTimeout(function(){u.apply(e,t)},n)}}module.exports=debounce;
