const SPEED = 200

var TheGame = function (game) {
  this.game = game
  this.camera = game.camera
  this.pause = false
  this.mapName = undefined
  this.map = undefined
  this.light = undefined
  this.view = undefined
  this.blur = undefined
  this.dark = undefined
  this.glasses = undefined
  this.lamps = undefined
  this.cursors = undefined
  this.switch = undefined
  this.level = undefined
}

TheGame.prototype = {
  init: function (level, light, view) {
    this.light = light
    this.view = view
    this.level = level
    this.mapName = TheGame.levels[level]
  },

  preload: function () {
  },

  create: function () {
    this.game.stage.backgroundColor = '#000000'
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.map = this.game.add.tilemap(this.mapName)
    this.map.addTilesetImage('tilleset', 'tilleset')

    this.map.setCollisionBetween(0, 48, true, this.layer)

    this.layer = this.map.createLayer('background')
    this.layer.resizeWorld()

    this.createPlayer()
    this.createGoal()
    this.createObjects()

    this.pad1 = this.game.input.gamepad.pad1
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)

    this.createShader()
  },

  update: function () {
    this.action = this.pad1.isDown(Phaser.Gamepad.XBOX360_A) || this.spaceKey.isDown

    this.game.physics.arcade.collide(this.player, this.layer)
    this.game.physics.arcade.overlap(this.player, this.lamps, this.collectLamp, null, this)
    this.game.physics.arcade.overlap(this.player, this.glasses, this.collectGlasses, null, this)
    this.game.physics.arcade.overlap(this.player, this.goal, this.success, null, this)
    this.game.physics.arcade.overlap(this.player, this.switch, this.turnOnSwitch, null, this)

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

  collectLamp: function (player, lamp) {
    if (lamp.light > this.light) {
      this.light = lamp.light
      this.black.limit = this.light
    }
    lamp.kill()
  },

  collectGlasses: function (player, glasses) {
    this.view = glasses.power
    this.blur.limit = this.view

    glasses.kill()
  },

  turnOnSwitch: function (player, s) {
    if (!s.isOn && this.action) {
      s.isOn = true
      s.frame = 1
      this.map.removeTile(s.gate1x, s.gate1y)
      this.map.removeTile(s.gate2x, s.gate2y)
    }
  },

  success: function (player, goal) {
    if (this.action) {
      this.level += 1
      if (this.level < TheGame.nbLevels) {
        this.game.state.restart(true, false, this.level, this.light, this.view)
      } else {
        this.game.state.start('main')
      }
    }
  },

  movePlayer: function () {
    var vx = 0
    var vy = 0

    if (this.pad1.connected) {
      var leftStickX = this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)
      var leftStickY = this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y)

      if (!leftStickX) {
        leftStickX = 0
      }
      if (!leftStickY) {
        leftStickY = 0
      }

      vx = leftStickX * SPEED
      vy = leftStickY * SPEED
    }

    if (this.cursors.left.isDown) {
      vx = -SPEED
    }

    if (this.cursors.right.isDown) {
      vx = SPEED
    }

    if (this.cursors.up.isDown) {
      vy = -SPEED
    }

    if (this.cursors.down.isDown) {
      vy = SPEED
    }

    if (vx || vy) {
      this.player.rotation = Math.atan2(vx, -vy)
    }

    this.player.body.velocity.x = vx
    this.player.body.velocity.y = vy
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
    this.world.filters = [this.blur, this.black]
  },

  createPlayer: function () {
    this.start = this.findObject('start')
    this.player = this.game.add.sprite(this.start.x, this.start.y, 'theman')
    this.player.anchor.setTo(0.5, 0.5)

    this.physics.enable(this.player, Phaser.Physics.ARCADE)
    var xoffset = (this.player.width - 36) / 2
    var yoffset = (this.player.height - 36) / 2
    this.player.body.setSize(36, 36, xoffset, yoffset)

    this.camera.follow(this.player)
  },

  createGoal: function () {
    this.end = this.findObject('end')

    this.goal = this.game.add.sprite(this.end.x, this.end.y, 'empty')
    this.goal.anchor.setTo(0.5, 0.5)
    this.physics.enable(this.goal, Phaser.Physics.ARCADE)
  },

  createObjects: function () {
    this.lamps = this.game.add.group()
    this.lamps.enableBody = true
    this.map.createFromObjects('GameObject', 91, 'lamp', 0, true, false, this.lamps)

    this.glasses = this.game.add.group()
    this.glasses.enableBody = true
    this.map.createFromObjects('GameObject', 93, 'glasses', 0, true, false, this.glasses)

    this.switch = this.game.add.group()
    this.switch.enableBody = true
    this.map.createFromObjects('GameObject', 95, 'switch', 0, true, false, this.switch)
  }
}
