var TheGame = function (game) {
  this.game = game
  this.pause = false
}

TheGame.prototype = {
  preload: function () {
  },

  create: function () {
    this.game.stage.backgroundColor = '#736357'

    this.sprite = this.game.add.sprite(300, 300, 'theman')
    this.sprite.anchor.setTo(0.5, 0.5)

    this.pad1 = this.game.input.gamepad.pad1
  },

  update: function () {
    var rightStickX = this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X)
    var rightStickY = this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y)

    if (rightStickX) {
      this.sprite.x += rightStickX * 10
    } else {
      rightStickX = 0
    }

    if (rightStickY) {
      this.sprite.y += rightStickY * 10
    } else {
      rightStickY = 0
    }
    if (rightStickX || rightStickY) {
      this.sprite.rotation = Math.atan2(rightStickX, -rightStickY)
    }
  },

  render: function () {
  }
}
