navigator.mediaDevices = {
    getUserMedia: jest.fn()
}

class AudioContext{
    createScriptProcessor() {
        return { connect: jest.fn() }
      }
      createMediaStreamSource() {
        return { connect: jest.fn() }
      }
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