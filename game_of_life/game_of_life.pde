PShader fragShader;
PGraphics pg;

void setup() {
  size(600,600,P2D);
  frameRate(12);
  
  fragShader = loadShader("conway.frag");
  
  
  fragShader.set("resolution", float(width), float(height));
  pg = createGraphics(width, height, P2D);
  pg.noSmooth();
  
  
  
  
  // CONWAY /////////////
  
  pg.beginDraw();
    pg.fill(0);
    pg.stroke(255);
    pg.strokeWeight(10);
    pg.rect(0,0,pg.width, pg.height);
    
    pg.stroke(255);
    pg.strokeWeight(30);
    pg.ellipse(300,300,150,150);
  pg.endDraw();
  fragShader.set("initialtex", pg.get());
  fragShader.set("first_frame", 1.0);
  
  ////////////////////////////////////////////
  
  fragShader.set("mouse", float(mouseX)/width, 1 - float(mouseY)/height);
  fragShader.set("brush", mousePressed);

}  


void draw() {
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
  image(pg, 0, 0, width, height);
  fragShader.set("first_frame", 0.0);
}