(function() {
  'use strict';

  var VERT = [
    'attribute vec2 aPos;',
    'varying vec2 vUv;',
    'void main() {',
    '  vUv = aPos * 0.5 + 0.5;',
    '  gl_Position = vec4(aPos, 0.0, 1.0);',
    '}'
  ].join('\n');

  var FRAG = [
    'precision highp float;',
    'varying vec2 vUv;',

    'uniform vec2 uRes;',
    'uniform float uTime;',
    'uniform float uRound;',
    'uniform float uDepth;',
    'uniform float uRough;',
    'uniform float uSplit;',
    'uniform float uScale;',
    'uniform float uStretch;',
    'uniform float uAngle;',
    'uniform float uRepeats;',
    'uniform float uOffset;',
    'uniform float uPhase;',
    'uniform float uEvolve;',

    'uniform vec3 uColor0, uColor1, uColor2, uColor3, uColor4, uColor5, uColor6, uColor7;',
    'uniform int uNumColors;',

    'vec3 sampleRamp(float t) {',
    '  vec3 c0 = uColor0; vec3 c1 = uColor1; vec3 c2 = uColor2; vec3 c3 = uColor3;',
    '  vec3 c4 = uColor4; vec3 c5 = uColor5; vec3 c6 = uColor6; vec3 c7 = uColor7;',
    '  float s = clamp(t, 0.0, 1.0) * 7.0;',
    '  int i = int(s);',
    '  float f = s - float(i);',
    '  if (i <= 0) return mix(c0, c1, f);',
    '  if (i == 1) return mix(c1, c2, f);',
    '  if (i == 2) return mix(c2, c3, f);',
    '  if (i == 3) return mix(c3, c4, f);',
    '  if (i == 4) return mix(c4, c5, f);',
    '  if (i == 5) return mix(c5, c6, f);',
    '  if (i == 6) return mix(c6, c7, f);',
    '  return c7;',
    '}',

    'void main() {',
    '  vec2 uv = vUv;',
    '  vec2 r = uRes;',
    '  float aspect = r.x / r.y;',

    '  vec2 c = uv * 2.0 - 1.0;',
    '  c.x *= aspect;',
    '  float d = length(c);',

    '  float rounding = 1.0 - clamp(uRound, 0.0, 0.99);',
    '  float mask = 1.0 - smoothstep(rounding * 0.7, 1.0, d);',

    '  float angle = uAngle * 3.14159265 / 180.0;',
    '  float ca = cos(angle);',
    '  float sa = sin(angle);',
    '  vec2 st = vec2(',
    '    c.x * ca - c.y * sa,',
    '    c.x * sa + c.y * ca',
    '  );',
    '  st.x *= uStretch;',

    '  float evo = uTime * uEvolve + uPhase;',
    '  float offset = uOffset + evo;',

    '  float x = st.x * uScale * uRepeats + offset;',
    '  float band = sin(x * 3.14159265 * 2.0) * 0.5 + 0.5;',

    '  float rough = clamp(uRough, 0.01, 0.99);',
    '  float edge = 1.0 - rough;',
    '  float sharp = smoothstep(0.5 - edge * 0.35, 0.5 + edge * 0.35, band);',
    '  float gradPos = clamp(sharp + sin(x * 3.14159 + evo * 0.3) * 0.02, 0.0, 1.0);',

    '  vec3 col;',
    '  float sp = clamp(uSplit, 0.0, 0.1);',
    '  vec3 colR = sampleRamp(gradPos + sp);',
    '  vec3 colG = sampleRamp(gradPos);',
    '  vec3 colB = sampleRamp(gradPos - sp);',
    '  col.r = colR.r;',
    '  col.g = colG.g;',
    '  col.b = colB.b;',

    '  float depth = clamp(uDepth, 0.0, 0.5);',
    '  float bevel = smoothstep(rounding, rounding + 0.08, d);',
    '  float edgeShade = bevel * depth;',
    '  col -= edgeShade;',

    '  float innerGlow = (1.0 - d) * 0.15 * depth * 2.0;',
    '  col += innerGlow;',

    '  col *= mask;',

    '  gl_FragColor = vec4(col, mask);',
    '}'
  ].join('\n');

  function ChromeShader(el, opts) {
    if (!el) return;
    opts = opts || {};

    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;border-radius:inherit;';
    canvas.setAttribute('data-chrome','');
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.style.isolation = 'isolate';
    el.insertBefore(canvas, el.firstChild);

    var gl = canvas.getContext('webgl', { premultipliedAlpha: false, alpha: true });
    if (!gl) return;

    var prog = createProgram(gl);
    if (!prog) return;

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    var aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    var uniforms = {};
    var unames = ['uRes','uTime','uRound','uDepth','uRough','uSplit','uScale','uStretch','uAngle','uRepeats','uOffset','uPhase','uEvolve'];
    unames.forEach(function(n) { uniforms[n] = gl.getUniformLocation(prog, n); });
    var colUniforms = [];
    for (var i = 0; i < 8; i++) {
      colUniforms.push(gl.getUniformLocation(prog, 'uColor' + i));
    }
    uniforms.uNumColors = gl.getUniformLocation(prog, 'uNumColors');

    var defaults = {
      round: 0.85,
      depth: 0.08,
      rough: 0.50,
      split: 0.02,
      scale: 2.0,
      stretch: 1.0,
      angle: 45,
      repeats: 4.0,
      offset: 0.0,
      phase: 0.0,
      evolve: 0.15,
      gradient: ['#ffffff','#aaaaaa','#ffffff','#555555','#ffffff','#cccccc','#ffffff','#666666']
    };

    var conf = {};
    Object.keys(defaults).forEach(function(k) { conf[k] = (opts[k] !== undefined) ? opts[k] : defaults[k]; });

    function hexToRgb(h) {
      var r = 0, g = 0, b = 0;
      h = h.replace('#','');
      if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
      if (h.length === 6) {
        r = parseInt(h[0]+h[1], 16) / 255;
        g = parseInt(h[2]+h[3], 16) / 255;
        b = parseInt(h[4]+h[5], 16) / 255;
      }
      return {r:r,g:g,b:b};
    }

    function resize() {
      var w = el.offsetWidth;
      var h = el.offsetHeight;
      if (w < 1 || h < 1) return;
      var dpr = window.devicePixelRatio || 1;
      var bw = Math.round(w * dpr);
      var bh = Math.round(h * dpr);
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
        gl.viewport(0, 0, bw, bh);
      }
      return {w:bw, h:bh, aspect: bw/bh};
    }

    function setColors() {
      var grad = conf.gradient;
      var len = Math.min(grad.length, 8);
      for (var i = 0; i < len; i++) {
        var c = hexToRgb(grad[i]);
        gl.uniform3f(colUniforms[i], c.r, c.g, c.b);
      }
      for (var j = len; j < 8; j++) {
        gl.uniform3f(colUniforms[j], 0, 0, 0);
      }
      gl.uniform1i(uniforms.uNumColors, len);
    }

    var startTime = performance.now();
    var destroyed = false;
    var ro;

    function draw() {
      if (destroyed) return;
      var dims = resize();
      if (!dims) { requestAnimationFrame(draw); return; }

      var t = (performance.now() - startTime) / 1000;

      gl.useProgram(prog);
      gl.uniform2f(uniforms.uRes, dims.w, dims.h);
      gl.uniform1f(uniforms.uTime, t);
      gl.uniform1f(uniforms.uRound, conf.round);
      gl.uniform1f(uniforms.uDepth, conf.depth);
      gl.uniform1f(uniforms.uRough, conf.rough);
      gl.uniform1f(uniforms.uSplit, conf.split);
      gl.uniform1f(uniforms.uScale, conf.scale);
      gl.uniform1f(uniforms.uStretch, conf.stretch);
      gl.uniform1f(uniforms.uAngle, conf.angle);
      gl.uniform1f(uniforms.uRepeats, conf.repeats);
      gl.uniform1f(uniforms.uOffset, conf.offset);
      gl.uniform1f(uniforms.uPhase, conf.phase);
      gl.uniform1f(uniforms.uEvolve, conf.evolve);
      setColors();

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(draw);
    }

    ro = new ResizeObserver(function() { resize(); });
    ro.observe(el);

    resize();
    draw();

    this.destroy = function() {
      destroyed = true;
      if (ro) ro.disconnect();
    };

    this.set = function(k, v) {
      if (k in conf) conf[k] = v;
    };
  }

  function createShader(gl, type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn('[chrome-shader] compile:', gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  function createProgram(gl) {
    var vs = createShader(gl, gl.VERTEX_SHADER, VERT);
    var fs = createShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return null;
    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('[chrome-shader] link:', gl.getProgramInfoLog(prog));
      gl.deleteProgram(prog);
      return null;
    }
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return prog;
  }

  window.ChromeShader = ChromeShader;
})();
