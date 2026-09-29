let img;
let contrast = 100;
let hue = 200;
let txt = "POSTER";
let txtSize = 60;

function preload() {
  img = createGraphics(400, 400);
  img.background(255);
  img.fill(0);
  img.ellipse(200, 200, 260, 260);
}

function setup() {
  createCanvas(600, 600);
  colorMode(HSL, 360, 100, 100);

  let cSlider = select("#contrastSlider");
  cSlider.input(function(){
    contrast = cSlider.value();
  });

  let hSlider = select("#hueSlider");
  hSlider.input(function(){
    hue = hSlider.value();
  });

  let tSlider = select("#textSizeSlider");
  tSlider.input(function(){
    txtSize = tSlider.value();
  });

  select("#textInput").input(function(){
    txt = select("#textInput").value();
  });

  select("#imageInput").changed(function(){
    loadImage(URL.createObjectURL(select("#imageInput").elt.files[0]), function(newImg){
      img = newImg;
    });
  });

  select("#saveButton").mousePressed(function(){
    saveCanvas("poster", "png");
  });
}

function draw() {
  background(255);
  if (!img) {
    return;
  }
  
  img.loadPixels();
  let step = 4;
  push();
  noStroke();
  for(let x = 0; x < width; x = x + step){
    for(let y = 0; y < height; y = y + step){
      let sourceX = map(x, 0, width, 0, img.width);
      let sourceY = map(y, 0, height, 0, img.height);
      let pixelIndex = (floor(sourceY) * img.width + floor(sourceX)) * 4;
      
      let red = img.pixels[pixelIndex];
      let green = img.pixels[pixelIndex + 1];
      let blue = img.pixels[pixelIndex + 2];
      let brightness = (red + green + blue) / 3;
      
      brightness = (brightness - 128) * contrast / 100 + 128;
      if (brightness < 0) {
        brightness = 0;
      }
      if (brightness > 255) {
        brightness = 255;
      }
      
      let circleRadius = map(brightness, 0, 255, step * 1.1, 0);
      fill(hue,70,45);
      ellipse(x, y, circleRadius, circleRadius);
    }
  }
  pop();

  let strokeWidth = txtSize * 0.05;
  if (strokeWidth < 1.5) {
    strokeWidth = 1.5;
  }
  stroke(hue,70,50);
  strokeWeight(strokeWidth);
  fill(255);
  textSize(txtSize);
  textAlign(CENTER, CENTER);
  text(txt, width / 2, height / 2);
}
