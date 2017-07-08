#define PROCESSING_COLOR_SHADER

#ifdef GL_ES
precision highp float;
precision mediump int;
#endif

uniform vec2 resolution;
uniform sampler2D ppixels;
uniform sampler2D initialtex;

uniform float first_frame;
uniform float kill_rate;
uniform float feed_rate;
uniform float dA;
uniform float dB;

vec2 psize = 1./resolution.xy;

vec4 getColorAt(vec2 pos, vec2 offset) {
  if(first_frame > 0.) {
    return texture2D(initialtex, pos + (psize*offset));
  } else {
    return texture2D(ppixels, pos + (psize*offset));
  }
}

float laplacian(vec2 pos, float which) {
  float sum = 0.;
  if(which > 0.1) {
    sum += 0.05 * getColorAt(pos, 0.5*vec2(-1., -1.)).r;
    sum += 0.2 * getColorAt(pos, vec2(-1., 0.)).r;
    sum += 0.05 * getColorAt(pos, 0.5*vec2(-1., 1.)).r;
    sum += 0.2 * getColorAt(pos, vec2(0., -1.)).r;
    sum += -1.0 * getColorAt(pos, vec2(0., 0.)).r;
    sum += 0.2 * getColorAt(pos, vec2(0., 1.)).r;
    sum += 0.05 * getColorAt(pos, 0.5*vec2(1., -1.)).r;
    sum += 0.2 * getColorAt(pos, vec2(1., 0.)).r;
    sum += 0.05 * getColorAt(pos, 0.5*vec2(1., 1.)).r;
  } else {
    sum += 0.05 * getColorAt(pos, 0.5*vec2(-1., -1.)).g;
    sum += 0.2 * getColorAt(pos, vec2(-1., 0.)).g;
    sum += 0.05 * getColorAt(pos, 0.5*vec2(-1., 1.)).g;
    sum += 0.2 * getColorAt(pos, vec2(0., -1.)).g;
    sum += -1.0 * getColorAt(pos, vec2(0., 0.)).g;
    sum += 0.2 * getColorAt(pos, vec2(0., 1.)).g;
    sum += 0.05 * getColorAt(pos, 0.5*vec2(1., -1.)).g;
    sum += 0.2 * getColorAt(pos, vec2(1., 0.)).g;
    sum += 0.05 * getColorAt(pos, 0.5*vec2(1., 1.)).g;
  }

  return sum;
}

void main() {
  
  vec2 st = gl_FragCoord.xy/resolution.xy;

  vec4 me = getColorAt(st, vec2(0., 0.));

  float A = me.r; 
  float B = me.g;

  float nA = A + ((dA*laplacian(st, 1.)) - A*B*B + feed_rate*(1.-A));
  float nB = B + ((dB*laplacian(st, 0.)) + A*B*B - (kill_rate+feed_rate)*B);

  nA = clamp(nA, 0., 1.);
  nB = clamp(nB, 0., 1.);

  gl_FragColor = vec4( vec3(nA, nB, 1.), 1. );
}