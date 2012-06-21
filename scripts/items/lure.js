re.c('lure')
.requires('image lureSmall.png update force')
.defines({
  color: 'rgb(100, 200, 200)',
  radius: 5,
  flying: false,
  attached: true,
 
  setPole: function(pole) {
  	this.pole = pole;
  	this.posX = pole.posX
 	this.posY = pole.posY-(pole.sizeX*pole.scaleX)
 	this.positionFromPole()
  },

  update: function() {
  	if (this.attached) {
  		this.positionFromPole()
  	}
  },

  positionFromPole: function() {
  	angle = degreeToRadian(Math.abs(this.pole.rotation))
  	hip = this.pole.sizeX*this.pole.scaleX
  	co = Math.sin(angle)*hip
	ca = Math.cos(angle)*hip

	this.posX = this.pole.posX + ca
	this.posY = this.pole.posY - Math.abs(co)

	// Copensente for lure size to center on this.pole
	this.posX -= this.sizeX/2
	this.posY -= this.sizeY/2
  },

  castFromPole: function() {
  	this.attached = false;
  	this.flying = true;
  }
})
.init(function(){
  this.on({
  	update: this.update
  })
})
.dispose(function(){
  
});
