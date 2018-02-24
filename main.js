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
  Phaser.Gamepad.XBOX360_STICK_RIGHT_X = 3
  Phaser.Gamepad.XBOX360_STICK_RIGHT_Y = 4

  var game = new Phaser.Game(800, 600, Phaser.AUTO, '')
  game.state.add('main', new Starting(game))
  game.state.add('glasses', new TheGame(game))
  game.state.start('main')
}
