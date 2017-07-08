uniform sampler2D texture;
varying vec4 vertTexCoord;
 
void main(){
    vec4 inColor = texture2D(texture, vertTexCoord.st);



    vec3 col = vec3(inColor.r - inColor.g);

    gl_FragColor = vec4(col, 1.0);
}