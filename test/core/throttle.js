"use strict";function test(){console.log("test")}function throttle(n,o){var l,u,r,s,i=0,a=function(){i=new Date,r=null,s=n.apply(l,u)};return function(){var t=new Date,e=o-(t-i);return l=this,u=arguments,e<=0?(clearTimeout(r),r=null,i=t,s=n.apply(l,u)):r||(r=setTimeout(a,e)),s}}test(),module.exports=throttle;
