/*
  Fishing girl Pole

  obs: align serves as initial prototype helper to align the pole, should be removed in advanced stages
*/

re.c('pole')
.requires('image fishingRod1.png update keyboard mouse')
.defines({
	height: 50,
  rotation: 0, // Degrees
  casting: false,
  angularVel: 5, //Degrees,
  scaleX: 0.5,
  scaleY: 0.5,
  castingDirection: -1,

  update: function() {
    if (this.casting) {
      this.angularMovement()
    }
  },

  angularMovement: function() {
    this.rotation += this.castingDirection * this.angularVel;
    this.changeDirection();
    if (this.rotation > 0) {
      this.castingDirection *= -1;
      this.stopCasting();
    }
  },

  changeDirection: function() {
    if (this.rotation <= -180)
      this.castingDirection *= -1
  },

  stopCasting: function() {
    this.casting = false;
    this.rotation = 0;
  },

  startCasting: function() {
    if (!this.casting) {
      this.rotation = 0;
    }

    if (this.lure == null) {
      this.lure = re.e('lure')
      this.lure.setPole(this)
    }
    this.casting = true;
  },

  throwLure: function() {
    this.lure.castFromPole(this);
    this.lure = null
    if (this.castingDirection == -1)
      this.castingDirection *= -1
  },

  // move to other component
  scaledSizeX: function() {
    return this.sizeX*this.scaleX
  }
})
.init(function(){
  this.lure = re.e('lure')
  this.lure.setPole(this)

  this.on('update', this.update)
  // this.on('keydown:a', this.startCasting)
  // this.on('keyup:a', this.throwLure)
  this.on('mousedown', this.startCasting)
  this.on('mouseup', this.throwLure)
})
.dispose(function(){
  
});
