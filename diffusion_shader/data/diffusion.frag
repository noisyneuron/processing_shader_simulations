#define PROCESSING_COLOR_SHADER

#ifdef GL_ES
precision highp float;
precision mediump int;
#endif

uniform vec2 resolution;
uniform vec2 mouse;
uniform sampler2D ppixels;
// uniform sampler2D initialtex;
uniform bool brush;

uniform float first_frame;
uniform float kill_rate;
uniform float feed_rate;
uniform float dA;
uniform float dB;

vec2 psize = 1./resolution.xy;
float dtime = 1.;

vec4 getColorAt(vec2 pos, vec2 offset) {
  if(first_frame > 0.) {
    if(pos.x > .48 && pos.x < .52 && pos.y > .48 && pos.y < .52) {
      return vec4(1., 1., 0., 1.);
    } else {
      return vec4(1., 0., 0., 1.);
    }
    // return texture2D(initialtex, pos + (psize*offset));
  } else {
    return texture2D(ppixels, pos + (psize*offset));
  }
}

vec4 laplacian(vec2 pos) {
  vec4 sum = vec4(0.);
  sum += 0.05 * getColorAt(pos, vec2(-1., -1.));
  sum += 0.2 * getColorAt(pos, vec2(-1., 0.));
  sum += 0.05 * getColorAt(pos, vec2(-1., 1.));
  sum += 0.2 * getColorAt(pos, vec2(0., -1.));
  sum += -1.0 * getColorAt(pos, vec2(0., 0.));
  sum += 0.2 * getColorAt(pos, vec2(0., 1.));
  sum += 0.05 * getColorAt(pos, vec2(1., -1.));
  sum += 0.2 * getColorAt(pos, vec2(1., 0.));
  sum += 0.05 * getColorAt(pos, vec2(1., 1.));
  return sum;
}

void main() {
  
  vec2 st = gl_FragCoord.xy/resolution.xy;

  vec4 me = getColorAt(st, vec2(0., 0.));



  float A = me.r; 
  float B = me.g;

  float nA = A + dtime*((dA*laplacian(st).r) - A*B*B + feed_rate*(1.-A));
  float nB = B + dtime*((dB*laplacian(st).g) + A*B*B - (kill_rate+feed_rate)*B);

  nA = clamp(nA, 0., 1.);
  nB = clamp(nB, 0., 1.);

  vec2 diff = abs(st - mouse);
  if(brush && diff.x <= .5*psize.x && diff.y <= .5*psize.y) {
    nB = .8;
  }

  // vec3 col = vec3(fract(nA-nB)); 
  // vec3 col = vec3(nA-nB); 
  vec3 col = vec3(nA, nB, 0.);
  // vec3 col = vec3(nA+nB/2.);
  // 
  // vec3 col = vec3(mix(nB - nA));

  gl_FragColor = vec4( col,  1. );
}