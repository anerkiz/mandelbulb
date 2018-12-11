!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){n(1);var r,o,i,a,u,c,l,m,d=n(2),f=n(3);window.onload=function(){if(s.width=document.body.clientWidth,s.height=document.body.clientHeight,!(r=s.getContext("webgl")||s.getContext("experimental-webgl")))return void console.log("浏览器不支持webgl");$.when($.get("vertex.cpp"),$.get("fragment.cpp")).done(function(e,t){o=d.init(r,e,t),r.uniform2f(r.getUniformLocation(o,"resolution"),s.width,s.height),i=r.getUniformLocation(o,"campos"),a=r.getUniformLocation(o,"power"),u=r.getUniformLocation(o,"minimumDistanceToSurface"),c=r.getUniformLocation(o,"keyLightColor"),l=r.getUniformLocation(o,"fillLightColor"),m=r.getUniformLocation(o,"specularColor"),function(){var e=r.getAttribLocation(o,"a_position"),t=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,t),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW),r.enableVertexAttribArray(e),r.vertexAttribPointer(e,2,r.FLOAT,!1,0,0)}(),w()}),window.addEventListener("resize",g,!1)};var s=document.getElementById("canvas");function g(){s.width=window.innerWidth,s.height=window.innerHeight,r.uniform2f(r.getUniformLocation(o,"resolution"),window.innerWidth,window.innerHeight)}function w(){f.play();var e=f.getCamPos();r.uniform3f(i,e[0],e[1],e[2]),r.uniform1f(a,f.getPower()),r.uniform1f(u,f.getDetail());var t=f.getKLC(),n=f.getFLC(),o=f.getSC();r.uniform3f(c,t[0],t[1],t[2]),r.uniform3f(l,n[0],n[1],n[2]),r.uniform3f(m,o[0],o[1],o[2]),r.drawArrays(r.TRIANGLES,0,6),window.requestAnimationFrame(w,s)}},function(e,t,n){var r;void 0===(r=function(){window.requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e,t){return window.setTimeout(e,1e3/60)},window.cancelRequestAnimFrame=window.cancelCancelRequestAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||window.clearTimeout}.apply(t,[]))||(e.exports=r)},function(e,t,n){var r;void 0===(r=function(){var e;function t(t,n){var r=e.createShader(n);if(!r)return console.log("Unable to create "+n+" Shader"),null;if(e.shaderSource(r,t),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS))return r;var o=e.getShaderInfoLog(r);return e.deleteShader(r),console.log("Failed to compile  "+n+" shader: "+o),null}return{init:function(n,r,o){(e=n).getExtension("OES_standard_derivatives"),e.enable(e.CULL_FACE),e.depthFunc(e.LEQUAL),e.enable(e.DEPTH_TEST);var i=e.createProgram(),a=t(r[0],e.VERTEX_SHADER),u=t(o[0],e.FRAGMENT_SHADER);return e.attachShader(i,a),e.attachShader(i,u),e.linkProgram(i),e.deleteShader(a),e.deleteShader(u),e.getProgramParameter(i,e.LINK_STATUS)?(e.useProgram(i),i):(e.deleteProgram(i),console.log("shader 初始化失败"),null)},getTexture:function(t,n){var r=new Image;r.onload=function(){var t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,image),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_NEAREST),e.generateMipmap(e.TEXTURE_2D);var r=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");if(r){var o=e.getParameter(r.MAX_TEXTURE_MAX_ANISOTROPY_EXT);e.texParameterf(e.TEXTURE_2D,r.TEXTURE_MAX_ANISOTROPY_EXT,o)}e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE0),n(t)},r.src=t}}}.apply(t,[]))||(e.exports=r)},function(e,t,n){var r;void 0===(r=function(){var e=0,t=0,n=.5*Math.PI,r=.25*Math.PI,o=2e-4,i=2,a=2,u=[1.4142,1.4142,0],c={key:[.85,.27,.85],light:[0,0,0],specular:[.9,.2,.35]};function l(e,t){return[a*Math.sin(t)*Math.sin(e),a*Math.cos(t),a*Math.sin(t)*Math.cos(e)]}function m(e){document.removeEventListener("mousemove",d,!1),document.removeEventListener("mouseup",m,!1)}function d(i){var a=i.clientX-e,c=i.clientY-t;n+=2*Math.PI*a*o,r-=2*Math.PI*c*o,r=Math.max(1e-6,Math.min(Math.PI-1e-6,r)),u=l(n,r),e=i.clientX,t=i.clientY}String.prototype.colorRgb=function(){var e=[3];return e[0]=parseInt("0x"+this.slice(1,3))/255,e[1]=parseInt("0x"+this.slice(3,5))/255,e[2]=parseInt("0x"+this.slice(5,7))/255,e},$(document).on("mousedown","canvas",function(n){e=n.clientX,t=n.clientY,document.addEventListener("mousemove",d,!1),document.addEventListener("mouseup",m,!1)}),$(document).on("mousewheel","canvas",function(){a=(a=(a-=event.wheelDelta*o)<.8?.8:a)>3?3:a,u=l(n,r)}),$(".colorpicker").change(function(){k=$(this).attr("name"),console.log($(this).val()),c[k]=$(this).val().colorRgb()});var f=!0,s=!1;return $(document).on("click","#play",function(){s=!s}),$(document).on("input","#power-slider",function(){i=parseFloat($("#power-slider").val())}),{play:function(){s&&(f?i+=.005:i-=.005,i>10&&(f=!1),i<2&&(f=!0),u=l(n+=.01,r),$("#power-slider").val(i))},getCamPos:function(){return u},getPower:function(){return i},getDetail:function(){return $("#detail-slider").val()},getKLC:function(){return c.key},getFLC:function(){return c.light},getSC:function(){return c.specular}}}.apply(t,[]))||(e.exports=r)}]);