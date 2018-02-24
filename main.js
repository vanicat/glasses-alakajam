var Starting = function (game) {
  this.game = game
}

Starting.prototype = {
  preload: function () {
    this.game.load.image('theman', 'assets/theman.svg')
  },

  create: function () {
    this.game.input.gamepad.start()
  },

  update: function () {
    this.game.state.start('glasses')
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

  Phaser.Gamepad.XBOX360_STICK_RIGHT_X = 3
  Phaser.Gamepad.XBOX360_STICK_RIGHT_Y = 4

  var game = new Phaser.Game(800, 600, Phaser.AUTO, '')
  game.state.add('main', new Starting(game))
  game.state.add('glasses', new TheGame(game))
  game.state.start('main')
}
