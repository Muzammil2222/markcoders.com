import { useEffect, useRef } from 'react'
import { DESKTOP_MOTION_QUERY } from '../lib/motion'

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
  useEffect(() => {
    propsRef.current = { speed, frequency, amplitude, level, color }
  }, [speed, frequency, amplitude, level, color])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const motion = window.matchMedia(DESKTOP_MOTION_QUERY)
    let renderer = null
    let visible = false
    let failed = false
    let raf = 0
    let needsResize = true
    let lastDraw = -Infinity
    const start = performance.now()

    // Defer context/shader allocation until this hero or footer is near the viewport.
    const createRenderer = () => {
      const gl = canvas.getContext('webgl', {
        antialias: false,
        alpha: false,
        depth: false,
        stencil: false,
        powerPreference: 'low-power',
      })
      if (!gl) return null

      const program = gl.createProgram()
      let vs
      let fs
      let buffer
      const dispose = () => {
        if (buffer) gl.deleteBuffer(buffer)
        gl.deleteProgram(program)
        if (vs) gl.deleteShader(vs)
        if (fs) gl.deleteShader(fs)
      }

      try {
        vs = compile(gl, gl.VERTEX_SHADER, VERTEX)
        fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
        gl.attachShader(program, vs)
        gl.attachShader(program, fs)
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          dispose()
          return null
        }
        gl.useProgram(program)

        buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
          gl.STATIC_DRAW
        )
        const loc = gl.getAttribLocation(program, 'a_pos')
        gl.enableVertexAttribArray(loc)
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
      } catch {
        dispose()
        return null
      }

      const u = {
        res: gl.getUniformLocation(program, 'u_res'),
        time: gl.getUniformLocation(program, 'u_time'),
        speed: gl.getUniformLocation(program, 'u_speed'),
        amp: gl.getUniformLocation(program, 'u_amp'),
        freq: gl.getUniformLocation(program, 'u_freq'),
        level: gl.getUniformLocation(program, 'u_level'),
        color: gl.getUniformLocation(program, 'u_color'),
      }

      return {
        dispose,
        draw(now) {
          if (needsResize) {
            // This soft background gains little from a full retina-sized buffer.
            const dpr = Math.min(window.devicePixelRatio || 1, motion.matches ? 1.5 : 1)
            const width = Math.max(1, Math.round(canvas.clientWidth * dpr))
            const height = Math.max(1, Math.round(canvas.clientHeight * dpr))
            if (canvas.width !== width || canvas.height !== height) {
              canvas.width = width
              canvas.height = height
            }
            gl.viewport(0, 0, canvas.width, canvas.height)
            needsResize = false
          }
          const p = propsRef.current
          gl.uniform2f(u.res, canvas.width, canvas.height)
          gl.uniform1f(u.time, motion.matches ? (now - start) / 1000 : 0)
          gl.uniform1f(u.speed, p.speed)
          gl.uniform1f(u.amp, p.amplitude)
          gl.uniform1f(u.freq, p.frequency)
          gl.uniform1f(u.level, p.level)
          gl.uniform3f(u.color, p.color[0], p.color[1], p.color[2])
          gl.drawArrays(gl.TRIANGLES, 0, 6)
        },
      }
    }

    const render = (now) => {
      raf = 0
      if (!visible || document.hidden || failed) return
      if (!renderer) renderer = createRenderer()
      if (!renderer) {
        failed = true
        return
      }
      // Slow decorative waves are smooth at 30fps. Touch and reduced-motion
      // render once, retaining the design without a continuous GPU workload.
      if (needsResize || now - lastDraw >= 1000 / 30) {
        renderer.draw(now)
        lastDraw = now
      }
      if (motion.matches) raf = requestAnimationFrame(render)
    }

    const stop = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }
    const kick = () => {
      if (visible && !document.hidden && !raf && !failed) {
        raf = requestAnimationFrame(render)
      }
    }
    const ro = new ResizeObserver(() => {
      needsResize = true
      kick()
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) kick()
      else stop()
    }, { rootMargin: '80px' })
    io.observe(canvas)

    const onVisibility = () => {
      if (document.hidden) stop()
      else kick()
    }
    const onMotionChange = () => {
      needsResize = true
      stop()
      kick()
    }
    document.addEventListener('visibilitychange', onVisibility)
    motion.addEventListener('change', onMotionChange)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      motion.removeEventListener('change', onMotionChange)
      renderer?.dispose()
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
