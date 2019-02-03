var t=window.AudioContext||window.webkitAudioContext;function e(t){var n,i;this.stream=t,this.state="inactive",this.em=document.createDocumentFragment(),this.encoder=(n=e.encoder.toString().replace(/^function\s*\(\)\s*{/,"").replace(/}$/,""),i=new Blob([n]),new Worker(URL.createObjectURL(i)));var s=this;this.encoder.addEventListener("message",function(t){var e=new Event("dataavailable");e.data=new Blob([t.data],{type:s.mimeType}),s.em.dispatchEvent(e),"inactive"===s.state&&s.em.dispatchEvent(new Event("stop"))})}e.prototype={mimeType:"audio/wav",start:function(e){if("inactive"===this.state){this.state="recording",this.context=new t;var n=this.context.createMediaStreamSource(this.stream),i=this.context.createScriptProcessor(2048,1,1),s=this;i.onaudioprocess=function(t){"recording"===s.state&&s.encoder.postMessage(["encode",t.inputBuffer.getChannelData(0)])},n.connect(i),i.connect(this.context.destination),this.em.dispatchEvent(new Event("start")),e&&(this.slicing=setInterval(function(){"recording"===s.state&&s.requestData()},e))}},stop:function(){"inactive"!==this.state&&(this.requestData(),this.state="inactive",clearInterval(this.slicing))},pause:function(){"recording"===this.state&&(this.state="paused",this.em.dispatchEvent(new Event("pause")))},resume:function(){"paused"===this.state&&(this.state="recording",this.em.dispatchEvent(new Event("resume")))},requestData:function(){"inactive"!==this.state&&this.encoder.postMessage(["dump",this.context.sampleRate])},addEventListener:function(){this.em.addEventListener.apply(this.em,arguments)},removeEventListener:function(){this.em.removeEventListener.apply(this.em,arguments)},dispatchEvent:function(){this.em.dispatchEvent.apply(this.em,arguments)}},e.isTypeSupported=function(t){return/audio\/wave?/.test(t)},e.notSupported=!navigator.mediaDevices||!t,e.encoder=function(){var t=2,e=[];onmessage=function(n){"encode"===n.data[0]?function(n){for(var i=n.length,s=new Uint8Array(i*t),a=0;a<i;a++){var r=a*t,o=n[a];o>1?o=1:o<-1&&(o=-1),s[r]=o*=32768,s[r+1]=o>>8}e.push(s)}(n.data[1]):function(n){var i=e.length?e[0].length:0,s=e.length*i,a=new Uint8Array(44+s),r=new DataView(a.buffer);r.setUint32(0,1380533830,!1),r.setUint32(4,36+s,!0),r.setUint32(8,1463899717,!1),r.setUint32(12,1718449184,!1),r.setUint32(16,16,!0),r.setUint16(20,1,!0),r.setUint16(22,1,!0),r.setUint32(24,n,!0),r.setUint32(28,n*t,!0),r.setUint16(32,t,!0),r.setUint16(34,8*t,!0),r.setUint32(36,1684108385,!1),r.setUint32(40,s,!0);for(var o=0;o<e.length;o++)a.set(e[o],o*i+44);e=[],postMessage(a.buffer,[a.buffer])}(n.data[1])}},module.exports=e;
//# sourceMappingURL=audio-polyfill.js.map
