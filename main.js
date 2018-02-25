var loading = {
  preload: function () {
    var style = { font: 'bold 32px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' }

    this.game.add.text(this.game.centerx, 0, 'Loading', style)

    this.game.load.image('theman', 'assets/theman.svg')
    this.game.load.image('lamp', 'assets/lamp.svg')
    this.game.load.image('empty', 'assets/empty.svg')
    this.game.load.spritesheet('switch', 'assets/switch.svg', 32, 32)
    this.game.load.image('glasses', 'assets/glasses.svg')
    this.game.load.tilemap('fst-map', 'assets/first-map.json', null, Phaser.Tilemap.TILED_JSON)

    this.game.load.script('MyBlur', 'filters/MyBlur.js')
    this.game.load.script('Black', 'filters/black.js')

    this.load.image('tilleset', 'assets/tilleset.svg')
  },
  create: function () {
    this.game.state.start('main')
  }
}

var Starting = function (game) {
  this.game = game
}

Starting.prototype = {
  preload: function () {
  },

  create: function () {
    this.game.input.gamepad.start()
    this.pad1 = this.game.input.gamepad.pad1

    var style = { font: 'bold 32px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' }

    this.game.add.text(0, 0, 'It\'s a bad idea to be lost in a cave without glasses', style)
    this.game.add.text(0, 32 * 1, 'Let\'s look for a way out', style)
    this.game.add.text(0, 32 * 3, 'Better with a gamepad.', style)
    this.game.add.text(0, 32 * 4, 'Cursor key or left stick to move.', style)
    this.game.add.text(0, 32 * 5, 'Space or button A for action.', style)
    this.game.add.text(0, 32 * 7, 'Start or enter to continue', style)

    this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
  },

  update: function () {
    if (this.pad1.isDown(Phaser.Gamepad.XBOX360_START) || this.enterKey.isDown) {
      this.game.state.start('glasses', true, false, 200, 150)
    }
  },

  render: function () {
  }
}

window.onload = function () {
  Phaser.Gamepad.XBOX360_A = 0
  Phaser.Gamepad.XBOX360_B = 1
  Phaser.Gamepad.XBOX360_X = 2
  Phaser.Gamepad.XBOX360_Y = 3
  Phaser.Gamepad.XBOX360_LEFT_BUMPER = 4
  Phaser.Gamepad.XBOX360_RIGHT_BUMPER = 5
  Phaser.Gamepad.XBOX360_START = 7
  Phaser.Gamepad.XBOX360_STICK_LEFT_BUTTON = 9
  Phaser.Gamepad.XBOX360_STICK_RIGHT_BUTTON = 10

  Phaser.Gamepad.XBOX360_STICK_LEFT_X = 0
  Phaser.Gamepad.XBOX360_STICK_LEFT_Y = 1
  Phaser.Gamepad.XBOX360_LEFT_TRIGGER = 2
  Phaser.Gamepad.XBOX360_STICK_RIGHT_X = 3
  Phaser.Gamepad.XBOX360_STICK_RIGHT_Y = 4
  Phaser.Gamepad.XBOX360_RIGHT_TRIGGER = 5
  Phaser.Gamepad.XBOX360_DPAD_LEFT_RIGHT = 6
  Phaser.Gamepad.XBOX360_DPAD_UP_DOWN = 7

  var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.WEBGL, '')
  game.state.add('loading', loading)
  game.state.add('main', new Starting(game))
  game.state.add('glasses', new TheGame(game, 'fst-map'))
  game.state.start('loading')
}
