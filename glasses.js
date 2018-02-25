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
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.map = this.game.add.tilemap('fst-map')
    this.map.addTilesetImage('tilleset', 'tilleset')

    this.map.setCollision(1, true, this.layer)

    this.layer = this.map.createLayer('background')
    this.layer.resizeWorld()

    this.start = this.findObject('start')

    this.player = this.game.add.sprite(this.start.x, this.start.y, 'theman')
    this.player.anchor.setTo(0.5, 0.5)
    this.physics.enable(this.player, Phaser.Physics.ARCADE)

    this.camera.follow(this.player)

    this.pad1 = this.game.input.gamepad.pad1

    this.blur = this.game.add.filter('MyBlur')

    this.blur.blur = 20
    this.blur.setResolution(this.game.width, this.game.height)
    console.log(this.game.height, this.game.width)
    this.blur.centerx = this.game.width / 2
    this.blur.centery = this.game.height / 2

    this.blur.limit = 100

    this.layer.filters = [this.blur]
  },

  update: function () {
    this.game.physics.arcade.collide(this.player, this.layer)

    var leftStickX = this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)
    var leftStickY = this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y)

    if (!leftStickX) {
      leftStickX = 0
    }
    if (!leftStickY) {
      leftStickY = 0
    }

    this.player.body.velocity.x = leftStickX * 100
    this.player.body.velocity.y = leftStickY * 100

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
