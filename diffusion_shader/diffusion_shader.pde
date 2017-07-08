PShader fragShader;
PShader colorShader;
PGraphics pg;

void setup() {
  size(600,600,P2D);
  //frameRate(1);
  
  fragShader = loadShader("diffusion.frag");
  colorShader = loadShader("diffusion-coloring.frag");
  
  
  fragShader.set("resolution", float(width), float(height));
  pg = createGraphics(width, height, P2D);
  pg.noSmooth();
  
  //fragShader.set("initialtex", pg.get());
  fragShader.set("first_frame", 1.0);
  fragShader.set("feed_rate", 0.054);
  fragShader.set("kill_rate", 0.062);
  fragShader.set("dA", 1.1);
  fragShader.set("dB", 0.5);
  fragShader.set("mouse", float(mouseX)/width, 1 - float(mouseY)/height);
  fragShader.set("brush", mousePressed);
  ////////////////////////////////////////////
}  


void draw() {
  fragShader.set("feed_rate", 0.091);
  fragShader.set("kill_rate", 0.060);
  fragShader.set("dA", 0.71);
  fragShader.set("dB", 0.21);
  fragShader.set("mouse", float(mouseX)/width, 1 - float(mouseY)/height);
  fragShader.set("brush", mousePressed);
  for(int i=0; i<10; i++) {
    pg.beginDraw();
      pg.background(0);
      pg.shader(fragShader);
      pg.rect(0,0,pg.width,pg.height);
    pg.endDraw();
  }
  background(0);
  shader(colorShader);
  image(pg, 0, 0, width, height);
  fragShader.set("first_frame", 0.0);
}