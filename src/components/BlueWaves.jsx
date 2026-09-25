import { useEffect, useRef } from 'react'

/**
 * BlueWaves
 * Black screen, blue wave line, blue fill below the wave, black above it.
 * The waves move continuously to the right. Pure WebGL, no dependencies.
 *
 * Usage:
 *   <BlueWaves />                              // fills its parent (parent needs a height)
 *   <div style={{ height: "100vh" }}><BlueWaves /></div>
 *
 * Props (all optional):
 *   speed      - wave cycles per second, moving right (default 0.25)
 *   frequency  - number of full waves across the screen (default 2)
 *   amplitude  - wave height, 0..0.5 of screen    (default 0.1)
 *   level      - vertical position, 0 bottom..1 top (default 0.45)
 *   color      - [r, g, b] blue, values 0..1      (default [0.0, 0.45, 1.0])
 */

const VERTEX = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAGMENT = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform float u_speed;
uniform float u_amp;
uniform float u_freq;
uniform float u_level;
uniform vec3  u_color;

// One perfect sine wave: y = sin(2*PI*freq*x - phase).
// Subtracting the phase makes the wave travel to the RIGHT.
float waveHeight(float x, float phase) {
  return sin(6.28318530718 * u_freq * x - phase);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;          // 0..1, origin bottom-left
  float phase = u_time * u_speed * 6.28318530718; // speed = wave cycles per second

  float y = u_level + waveHeight(uv.x, phase) * u_amp;

  // Signed distance (in screen-height units) from the wave line
  float d = uv.y - y;
  float px = 1.5 / u_res.y;                   // ~1.5px edge softness

  // Below the wave -> blue body, above -> black
  float body = 1.0 - smoothstep(-px, px, d);

  // Fade the body slightly toward the bottom for depth
  float depth = mix(0.35, 0.85, smoothstep(0.0, y, uv.y));
  vec3 fill = u_color * depth * body;

  // Bright crest line on the wave edge
  float line = 1.0 - smoothstep(0.0, px * 2.5, abs(d));
  vec3 crest = mix(u_color, vec3(1.0), 0.55) * line;

  // Soft glow just above the crest
  float glow = exp(-max(d, 0.0) * 28.0) * step(0.0, d) * 0.35;
  vec3 halo = u_color * glow;

  vec3 col = fill + halo + crest;
  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl, type, src) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error('Shader compile error: ' + log)
  }
  return shader
}

export default function BlueWaves({
  speed = 0.25,
  frequency = 1,
  amplitude = 0.1,
  level =   0.7,
  color = [0.0, 0.45, 1.0],
  className = '',
  style = {},
}) {
  const canvasRef = useRef(null)
  const propsRef = useRef({ speed, frequency, amplitude, level, color })
  propsRef.current = { speed, frequency, amplitude, level, color }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: 'low-power',
    })
    if (!gl) {
      console.warn('WebGL is not supported in this browser.')
      return
    }

    const program = gl.createProgram()
    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
      return
    }
    gl.useProgram(program)

    // Fullscreen triangle-pair
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )
    const loc = gl.getAttribLocation(program, 'a_pos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u = {
      res: gl.getUniformLocation(program, 'u_res'),
      time: gl.getUniformLocation(program, 'u_time'),
      speed: gl.getUniformLocation(program, 'u_speed'),
      amp: gl.getUniformLocation(program, 'u_amp'),
      freq: gl.getUniformLocation(program, 'u_freq'),
      level: gl.getUniformLocation(program, 'u_level'),
      color: gl.getUniformLocation(program, 'u_color'),
    }

    // A fullscreen fragment shader costs one pass per pixel per frame. Phones
    // report DPR 3 but have a fraction of the fill rate, and this is a soft
    // gradient behind a dark overlay — render it at 1x there.
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const maxDpr = coarse ? 1 : 2

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Pause when off-screen / tab hidden so hero+footer don't burn frames during scroll
    let visible = true
    let pageVisible = document.visibilityState !== 'hidden'
    let raf = 0
    const start = performance.now()

    const render = (now) => {
      raf = 0
      if (!visible || !pageVisible) return

      const p = propsRef.current
      const t = reduceMotion ? 0 : (now - start) / 1000

      gl.uniform2f(u.res, canvas.width, canvas.height)
      gl.uniform1f(u.time, t)
      gl.uniform1f(u.speed, p.speed)
      gl.uniform1f(u.amp, p.amplitude)
      gl.uniform1f(u.freq, p.frequency)
      gl.uniform1f(u.level, p.level)
      gl.uniform3f(u.color, p.color[0], p.color[1], p.color[2])
      gl.drawArrays(gl.TRIANGLES, 0, 6)

      raf = requestAnimationFrame(render)
    }

    const kick = () => {
      if (visible && pageVisible && !raf) raf = requestAnimationFrame(render)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        kick()
      },
      { rootMargin: '80px' }
    )
    io.observe(canvas)

    const onVisibility = () => {
      pageVisible = document.visibilityState !== 'hidden'
      kick()
    }
    document.addEventListener('visibilitychange', onVisibility)

    raf = requestAnimationFrame(render)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        background: '#000',
        ...style,
      }}
    />
  )
}
