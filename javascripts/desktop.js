var Kernel = function Kernel() {};

Kernel.prototype = {
  systemTray: null,
  startButton: null,
  bsod: null
};

window.kernel = new Kernel();

var SystemTray = function SystemTray(element) {
  var self = this;

  this.element = element;

  this.clockInterval = window.setInterval(function() {
    self.element.innerHTML = new Date().toLocaleTimeString();
  }, 1000);

  this.element.innerHTML = new Date().toLocaleTimeString();
};

SystemTray.prototype = {
  constructor: SystemTray,

  element: null,

  clockInterval: null
};

var StartButton = function StartButton(element) {
  var self = this;

  this.element = element;

  element.onclick = function(evt) {
    window.kernel.bsod.setActive(true);
  };
};

StartButton.prototype = {
  constructor: StartButton,

  element: null
};

var BSOD = function BSOD(element) {
  var self = this;

  this.element = element;
  this.canvas = element.getElementsByTagName('canvas')[0];
  this.canvas.width  = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.ctx = this.canvas.getContext('2d');

  window.onmousemove = function(evt) {
    var x = evt.pageX;
    var y = evt.pageY;

    self.ctx.fillStyle = '#008080';
    self.ctx.fillRect(x - 16, y - 16, 32, 32);
  };

  window.onkeypress = function(evt) {
    if (self.active) {
      self.recover();
    }
  };
};

BSOD.prototype = {
  constructor: BSOD,

  element: null,
  canvas: null,
  ctx: null,

  active: false,

  setActive: function(active) {
    this.active = active;
    this.element.className = active ? 'bsod active' : 'bsod';

    if (Math.floor(Math.random() * 2)) {
      kernel.startButton.element.blur();
    }

    window.clearTimeout(this.recoverTimeout);
  },

  recoverTimeout: null,

  recover: function() {
    var self = this;

    this.element.className = 'bsod recover';
    this.clearCanvas();

    this.recoverTimeout = window.setTimeout(function() {
      self.setActive(false);
    }, 3000);
  },

  clearCanvas: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};
