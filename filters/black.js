/**
* A vertical blur filter by Mat Groves http://matgroves.com/ @Doormat23
*/
Phaser.Filter.Black = function (game) {

    Phaser.Filter.call(this, game);

    this.uniforms.center = { type: '2f', value: { x:100.0, y:100.0 }};
    this.uniforms.limit = { type: '1f', value: 1024};

    this.fragmentSrc = [

      "precision mediump float;",
      "varying vec2 vTextureCoord;",
      "uniform vec2 resolution;",
      "varying vec4 vColor;",
      "uniform float limit;",
      "uniform vec2 center;",
      "uniform sampler2D uSampler;",

        "void main(void) {",

          "vec4 sum = vec4(0.0);",
          "float dist = length(gl_FragCoord.xy   - center);",
          "float black;",
          "if (dist < limit) black = 1.0;",
          "else black = 0.0;",

          "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * black;",
      
          "gl_FragColor = sum;",

        "}"

    ];

};

Phaser.Filter.Black.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.Black.prototype.constructor = Phaser.Filter.Black;

Object.defineProperty(Phaser.Filter.Black.prototype, 'centerx', {

    get: function() {
        return this.uniforms.center.value.x;
    },

    set: function(value) {
        this.dirty = true;
        this.uniforms.center.value.x = value;
    }

});


Object.defineProperty(Phaser.Filter.Black.prototype, 'centery', {

    get: function() {
        return this.uniforms.center.value.y;
    },

    set: function(value) {
        this.dirty = true;
        this.uniforms.center.value.y = value;
    }

});

Object.defineProperty(Phaser.Filter.Black.prototype, 'limit', {

    get: function() {
        return this.uniforms.limit.value;
    },

    set: function(value) {
        this.dirty = true;
        this.uniforms.limit.value = value;
    }

});

