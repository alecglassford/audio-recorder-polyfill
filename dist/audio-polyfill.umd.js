!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.MediaRecorderPolyfill=e()}(this,function(){var t=window.AudioContext||window.webkitAudioContext,e=function t(e){var n,i;this.mimeType="audio/wav",this.stream=e,this.state="inactive",this.em=document.createDocumentFragment(),this.encoder=(n=t.encoder.toString().replace(/^function\s*\(\)\s*{/,"").replace(/}$/,""),i=new Blob([n]),new Worker(URL.createObjectURL(i)));var s=this;this.encoder.addEventListener("message",function(t){var e=new Event("dataavailable");e.data=new Blob([t.data],{type:s.mimeType}),s.em.dispatchEvent(e),"inactive"===s.state&&s.em.dispatchEvent(new Event("stop"))})};return e.prototype.start=function(e){if("inactive"===this.state){this.state="recording",this.context=new t;var n=this.context.createMediaStreamSource(this.stream),i=this.context.createScriptProcessor(2048,1,1),s=this;i.onaudioprocess=function(t){"recording"===s.state&&s.encoder.postMessage(["encode",t.inputBuffer.getChannelData(0)])},n.connect(i),i.connect(this.context.destination),this.em.dispatchEvent(new Event("start")),e&&(this.slicing=setInterval(function(){"recording"===s.state&&s.requestData()},e))}},e.prototype.stop=function(){"inactive"!==this.state&&(this.requestData(),this.state="inactive",clearInterval(this.slicing))},e.prototype.pause=function(){"recording"===this.state&&(this.state="paused",this.em.dispatchEvent(new Event("pause")))},e.prototype.resume=function(){"paused"===this.state&&(this.state="recording",this.em.dispatchEvent(new Event("resume")))},e.prototype.requestData=function(){"inactive"!==this.state&&this.encoder.postMessage(["dump",this.context.sampleRate])},e.prototype.addEventListener=function(){this.em.addEventListener.apply(this.em,arguments)},e.prototype.removeEventListener=function(){this.em.removeEventListener.apply(this.em,arguments)},e.prototype.dispatchEvent=function(){this.em.dispatchEvent.apply(this.em,arguments)},e.isTypeSupported=function(t){return/audio\/wave?/.test(t)},e.notSupported=!navigator.mediaDevices||!t,e.encoder=function(){var t=2,e=[];onmessage=function(n){"encode"===n.data[0]?function(n){for(var i=n.length,s=new Uint8Array(i*t),a=0;a<i;a++){var o=a*t,r=n[a];r>1?r=1:r<-1&&(r=-1),s[o]=r*=32768,s[o+1]=r>>8}e.push(s)}(n.data[1]):function(n){var i=e.length?e[0].length:0,s=e.length*i,a=new Uint8Array(44+s),o=new DataView(a.buffer);o.setUint32(0,1380533830,!1),o.setUint32(4,36+s,!0),o.setUint32(8,1463899717,!1),o.setUint32(12,1718449184,!1),o.setUint32(16,16,!0),o.setUint16(20,1,!0),o.setUint16(22,1,!0),o.setUint32(24,n,!0),o.setUint32(28,n*t,!0),o.setUint16(32,t,!0),o.setUint16(34,8*t,!0),o.setUint32(36,1684108385,!1),o.setUint32(40,s,!0);for(var r=0;r<e.length;r++)a.set(e[r],r*i+44);e=[],postMessage(a.buffer,[a.buffer])}(n.data[1])}},e});
//# sourceMappingURL=audio-polyfill.umd.js.map
