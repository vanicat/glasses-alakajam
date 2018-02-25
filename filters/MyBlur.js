/**
* A vertical blur filter by Mat Groves http://matgroves.com/ @Doormat23
*/
Phaser.Filter.MyBlur = function (game) {

    Phaser.Filter.call(this, game);

    this.uniforms.blur = { type: '1f', value: 1 / 512 };
    this.uniforms.center = { type: '2f', value: { x:100.0, y:100.0 }};
    this.uniforms.limit = { type: '1f', value: 1024};

    this.fragmentSrc = [

      "precision mediump float;",
      "varying vec2 vTextureCoord;",
      "uniform vec2 resolution;",
      "varying vec4 vColor;",
      "uniform float blur;",
      "uniform float limit;",
      "uniform vec2 center;",
      "uniform sampler2D uSampler;",

        "void main(void) {",

          "vec4 sum = vec4(0.0);",
          "float dist = length(gl_FragCoord.xy   - center);",
          "float realBlur = blur;",
          "if (dist < limit) realBlur = blur / 2.0;",
          "if (2.0*dist < limit) realBlur = 0.0;",

          "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.1;",
          "sum += texture2D(uSampler, vec2(vTextureCoord.x + 4.47*realBlur, vTextureCoord.y - 2.0*realBlur)) * 0.3;",
          "sum += texture2D(uSampler, vec2(vTextureCoord.x - 4.47*realBlur, vTextureCoord.y - 2.0*realBlur)) * 0.3;",
          "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 4.0*realBlur)) * 0.3;",

          "gl_FragColor = sum;",

        "}"

    ];

};

Phaser.Filter.MyBlur.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.MyBlur.prototype.constructor = Phaser.Filter.MyBlur;

Object.defineProperty(Phaser.Filter.MyBlur.prototype, 'blur', {

    get: function() {
        return this.uniforms.blur.value / (1/7000);
    },

    set: function(value) {
        this.dirty = true;
        this.uniforms.blur.value = (1/7000) * value;
    }

});


Object.defineProperty(Phaser.Filter.MyBlur.prototype, 'centerx', {

    get: function() {
        return this.uniforms.center.value.x;
    },

    set: function(value) {
        this.dirty = true;
        this.uniforms.center.value.x = value;
    }

});


Object.defineProperty(Phaser.Filter.MyBlur.prototype, 'centery', {

    get: function() {
        return this.uniforms.center.value.y;
    },

    set: function(value) {
        this.dirty = true;
        this.uniforms.center.value.y = value;
    }

});

Object.defineProperty(Phaser.Filter.MyBlur.prototype, 'limit', {

    get: function() {
        return this.uniforms.limit.value;
    },

    set: function(value) {
        this.dirty = true;
        this.uniforms.limit.value = value;
    }

});

