var TheGame = function (game) {
  this.game = game
  this.camera = game.camera
  this.pause = false
}

TheGame.prototype = {
  preload: function () {
  },

  create: function () {
    this.game.stage.backgroundColor = '#736357'

    this.map = this.game.add.tilemap('fst-map')
    this.map.addTilesetImage('tilleset', 'tilleset')

    this.layer = this.map.createLayer('background')
    this.layer.resizeWorld()

    this.start = this.findObject('start')

    this.player = this.game.add.sprite(this.start.x, this.start.y, 'theman')
    this.player.anchor.setTo(0.5, 0.5)

    this.camera.follow(this.player)

    this.pad1 = this.game.input.gamepad.pad1
  },

  update: function () {
    var leftStickX = this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)
    var leftStickY = this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y)

    if (leftStickX) {
      this.player.x += leftStickX * 10
    } else {
      leftStickX = 0
    }

    if (leftStickY) {
      this.player.y += leftStickY * 10
    } else {
      leftStickY = 0
    }
    if (leftStickX || leftStickY) {
      this.player.rotation = Math.atan2(leftStickX, -leftStickY)
    }
  },

  render: function () {
  },

  findObject: function (name) {
    var objects = this.map.objects.GameObject
    for (let o in objects) {
      if (objects[o].name === name) {
        return objects[o]
      }
    }
  }
}
