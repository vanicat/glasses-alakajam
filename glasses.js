var TheGame = function (game, map) {
  this.game = game
  this.camera = game.camera
  this.pause = false
  this.map = map
  this.light = undefined
  this.view = undefined
  this.blur = undefined
  this.dark = undefined
}

TheGame.prototype = {
  init: function (light, view) {
    this.light = light
    this.view = view
  },

  preload: function () {
  },

  create: function () {
    this.game.stage.backgroundColor = '#000000'
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.map = this.game.add.tilemap(this.map)
    this.map.addTilesetImage('tilleset', 'tilleset')

    this.map.setCollision(1, true, this.layer)

    this.layer = this.map.createLayer('background')
    this.layer.resizeWorld()

    this.createPlayer()

    this.pad1 = this.game.input.gamepad.pad1

    this.createShader()
  },

  update: function () {
    this.game.physics.arcade.collide(this.player, this.layer)

    this.movePlayer()
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
  },

  light: function (power) {
    if (power > this.light) {
      this.dark = power
    }
  },

  view: function (dist) {
    if (dist > this.view) {
      this.view = dist
    }
  },

  movePlayer: function () {
    var leftStickX = this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)
    var leftStickY = this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y)

    if (!leftStickX) {
      leftStickX = 0
    }
    if (!leftStickY) {
      leftStickY = 0
    }

    console.log(leftStickX, leftStickY)

    this.player.body.velocity.x = leftStickX * 100
    this.player.body.velocity.y = leftStickY * 100

    if (leftStickX || leftStickY) {
      this.player.rotation = Math.atan2(leftStickX, -leftStickY)
    }
  },

  createShader: function () {
    this.blur = this.game.add.filter('MyBlur')
    this.blur.blur = 20
    this.blur.setResolution(this.game.width, this.game.height)
    this.blur.centerx = this.game.width / 2
    this.blur.centery = this.game.height / 2
    this.blur.limit = this.view
    this.black = this.game.add.filter('Black')
    this.black.setResolution(this.game.width, this.game.height)
    this.black.limit = this.light
    this.black.centerx = this.game.width / 2
    this.black.centery = this.game.height / 2
    this.layer.filters = [this.blur, this.black]
  },

  createPlayer: function () {
    this.start = this.findObject('start')
    this.player = this.game.add.sprite(this.start.x, this.start.y, 'theman')
    this.player.anchor.setTo(0.5, 0.5)
    this.physics.enable(this.player, Phaser.Physics.ARCADE)

    this.camera.follow(this.player)
  }
}
