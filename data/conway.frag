#define PROCESSING_COLOR_SHADER

#ifdef GL_ES
precision highp float;
precision mediump int;
#endif

uniform vec2 resolution;
uniform sampler2D ppixels;
uniform sampler2D initialtex;

uniform float first_frame;

vec2 psize = 1./resolution.xy;

vec4 getColorAt(vec2 pos, vec2 offset) {
  if(first_frame > 0.) {
    return texture2D(initialtex, pos + (psize*offset));
  } else {
    return texture2D(ppixels, pos + (psize*offset));
  }
}

void main() {
  
  vec2 st = gl_FragCoord.xy/resolution.xy;
  
  float sum = 0.;
  vec4 me = getColorAt(st, vec2(0., 0.));

  sum += getColorAt(st, vec2(-1., -1.)).r;
  sum += getColorAt(st, vec2(-1., 0.)).r;
  sum += getColorAt(st, vec2(-1., 1.)).r;
  sum += getColorAt(st, vec2(0., -1.)).r;
  sum += getColorAt(st, vec2(0., 1.)).r;
  sum += getColorAt(st, vec2(1., -1.)).r;
  sum += getColorAt(st, vec2(1., 0.)).r;
  sum += getColorAt(st, vec2(1., 1.)).r;

  /*
  Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
  Any live cell with two or three live neighbours lives on to the next generation.
  Any live cell with more than three live neighbours dies, as if by overpopulation.
  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
   */
  float n;

  if(me.r > 0.) {
    if(sum < 2.) {
      n = 0.;
    } else {
      if(sum <= 3.) {
        n = 1.;
      } else {
        n = 0.;
      }
    }
  } else {
    if(sum == 3.) {
      n = 1.;
    }
  }

  gl_FragColor = vec4(vec3(n), 1.);
}