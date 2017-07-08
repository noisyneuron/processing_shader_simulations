in vec4 position;


void main() {
  //orig: gl_Position = transform * vertex;
  
  gl_Position = vec4(position.xy-1.,0.,1.);

}