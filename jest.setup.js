navigator.mediaDevices = {
    getUserMedia: jest.fn()
}

function AudioContext() {}

AudioContext.prototype.createScriptProcessor = function() {
  return { connect: jest.fn() }
}

AudioContext.prototype.createMediaStreamSource = function() {
  return { connect: jest.fn() }
}

function Worker (url) {
  this.url = url
}

Worker.prototype = {
  addEventListener: function (type, cb) {
    this.listener = cb
  },
  postMessage: function () { }
}



URL.createObjectURL = function(blob) {
  return blob
}

global.Worker = Worker;
global.AudioContext = AudioContext;