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
    var leftStickX = this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)
    var leftStickY = this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y)

    if (leftStickX) {
      this.sprite.x += leftStickX * 10
    } else {
      leftStickX = 0
    }

    if (leftStickY) {
      this.sprite.y += leftStickY * 10
    } else {
      leftStickY = 0
    }
    if (leftStickX || leftStickY) {
      this.sprite.rotation = Math.atan2(leftStickX, -leftStickY)
    }
  },

  render: function () {
  }
}
