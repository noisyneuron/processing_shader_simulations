PShader fragShader;
PGraphics pg;

void setup() {
  size(600,600,P3D);
  //frameRate(1);
  
  // CONWAY
  fragShader = loadShader("conway.frag");
  
  
  // DIFFUSION
  //fragShader = loadShader("diffusion.frag", "diffusion.vert");
  
  
  fragShader.set("resolution", float(width), float(height));
  pg = createGraphics(width, height, P3D);
  pg.noSmooth();
  
  
  
  
  // CONWAY /////////////
  
  pg.beginDraw();
    pg.fill(0);
    pg.stroke(255);
    pg.strokeWeight(1);
    pg.rect(0,0,pg.width, pg.height);
    
    pg.stroke(255);
    pg.strokeWeight(30);
    pg.ellipse(300,300,150,150);
  pg.endDraw();
  fragShader.set("initialtex", pg.get());
  fragShader.set("first_frame", 1.0);
  
  ////////////////////////////////////////////
  
  
  
  
  
  
  // DIFFUSION /////////////
  
  //pg.beginDraw();
  //  pg.fill(255, 0, 0);
  //  pg.noStroke();
  //  pg.rect(0,0,pg.width, pg.height);
  //  pg.fill(255, 255, 0);
  //  pg.noStroke();
  //  //pg.ellipse(300,300,30,30);
  //  pg.rect(300,300,30,30);
  //pg.endDraw();
  //fragShader.set("initialtex", pg.get());
  //fragShader.set("first_frame", 1.0);
  //fragShader.set("feed_rate", 0.055);
  //fragShader.set("kill_rate", 0.062);
  //fragShader.set("dA", 1.);
  //fragShader.set("dB", 0.5);
  
  ////////////////////////////////////////////
}  


void draw() {
  for(int i=0; i<1; i++) {
    pg.beginDraw();
      pg.background(0);
      pg.shader(fragShader);
      pg.rect(0,0,pg.width,pg.height);
    pg.endDraw();
  }
  image(pg, 0, 0, width, height);
  fragShader.set("first_frame", 0.0);
}