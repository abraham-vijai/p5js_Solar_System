class SpaceObject {

  constructor(objectRadius, objectRotationSpeed, objectSubdivision, objectTexture, objectDistance, objectHasMoon = false, objectColor = null) {
    this.radius = objectRadius;
    this.subdivision = objectSubdivision;
    this.texture = objectTexture;
    this.distance = objectDistance;
    this.rotationSpeed = objectRotationSpeed;
    this.hasMoon = objectHasMoon;
    this.color = objectColor;
  }
  
  static starCount = 100;
  static starArray = [];
  static planetArray = [];
  
  createSpaceObject() {
    // Disable wireframe
    noStroke();

    // Add texture or color
    this.loadSurface(this.texture, this.color);

    // Rotate around the sun
    rotate(frameCount * this.rotationSpeed);

    // Translate to its position
    translate(this.distance, 0);

    // Rotate around its own axis
    rotateZ(frameCount * 0.01);

    // Draw the sphere
    sphere(this.radius, this.subdivision, this.subdivision);

  }

  createMoon(moonSize, distanceFromPlanet, rotationSpeed, customTexture) {
    if (this.hasMoon) {
      // Disable wireframe
      noStroke();

      // Add texture or color
      if(customTexture == null) {
        normalMaterial();
      }
      else{
        texture(customTexture);
      }

      push();

      // Rotate the moon around its parent planet
      rotate(frameCount * rotationSpeed);

      // Translate to moon's position relative to the planet
      translate(distanceFromPlanet + 5, 0);

      // Draw the moon sphere
      sphere(moonSize, 20, 20);

      pop();
    }
  }

  loadSurface(customTexture, customColor) {
    if (customTexture == null) {
      // Convert the color to RGB
      let clr = this.convertToRgb(customColor)

      // Use ambient and directional light
      ambientLight(150);
      
      // Set the light
      colorMode(HSB)
      directionalLight(255, 0, 50, 0, -5, -5);
      colorMode(RGB)

      // Set the color
      ambientMaterial(clr[0], clr[1], clr[2]);
    }
    else {
      // Apply the texture
      texture(customTexture);
    }
  }

  static setStarCount(newStarCount) {
    this.starCount = newStarCount;
  }

  static createStarfield() {
    // Set seed
    randomSeed(100);

    // Generate star positions once
    if (this.starArray.length == 0) {
      for (let i = 0; i < this.starCount; i++) {
        this.starArray.push({
          x: random(-width / 2, width / 2),
          y: random(-height / 2, height / 2),
        });
      }
    }

    for (let star of this.starArray) {
      // Draw the stars
      strokeWeight(3);
      stroke(random(180, 255), random(180, 255), random(180, 255));
      point(star.x, star.y);
    }

  }

  convertToRgb(colorToConvert) {

    // Convert to RGB
    let hexColor = colorToConvert; // Get the color from the color picker
    let c = color(hexColor); // Convert hex to a p5.js color object

    return [red(c), green(c), blue(c)]
  }
}
