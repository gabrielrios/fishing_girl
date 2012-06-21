re.c('lure')
.requires('image lureSmall.png update mouse')
.defines({
  color: 'rgb(100, 200, 200)',
  radius: 5,
  estate: 'attached'
  castedAngle: 0,
  floating: false,
  radiusIncrement: 0,


  setPole: function(pole) {
  	this.pole = pole;
  	this.posX = pole.posX
 	this.posY = pole.posY-(pole.sizeX*pole.scaleX)
  },

  update: function() {
  	if (re.pressed('mouse:left')) {
  		this.flyingRadius -= 1
  	}

  	if (this.posY >= re('water')[0].posY) {
  		this.flying = false
  		this.floating = true
  	}
  	if (this.attached) {
  		this.moveFromPole()
  	} else if (this.flying) {
  		this.moveFlying()
  	} else if (this.floating) {
  		this.moveFloating()
  	}

  	if (this.posY > 400) {
  		this.dispose()
  	}
  },

  moveFlying: function() {
  	this.castedAngle += 5;
  	this.flyingRadius += this.radiusIncrement;
  	this.move(this.castedAngle, this.flyingRadius)
  },

  moveFloating: function() {
  	if (this.posX + this.sizeX/2 >= this.pole.posX + this.pole.scaledSizeX()) {
  		this.castedAngle += 0.1;	
  	} 
  	
  	// console.log(this.posX)
  	// console.log()
  	this.move(this.castedAngle, this.flyingRadius)
  },

  moveFromPole: function() {
  	this.move(this.pole.rotation, this.pole.scaledSizeX())
  },

  move: function(pAngle, pHip) {
  	angle = degreeToRadian(pAngle*-1)
  	hip = pHip
  	co = Math.sin(angle)*hip
	ca = Math.cos(angle)*hip

	this.posX = this.pole.posX + ca
	this.posY = this.pole.posY - co

	// Copensente for lure size to center on this.pole
	this.posX -= this.sizeX/2
	this.posY -= this.sizeY/2
  },

  castFromPole: function() {
  	this.castedAngle = this.pole.rotation
  	normalizedAngle = Math.abs((this.castedAngle < -90) ? 180 + this.castedAngle : this.castedAngle)
  	this.radiusIncrement = 15 / (90 / normalizedAngle)
  	console.log('angle: ' + this.castedAngle)
  	console.log('radius: ' + this.radiusIncrement)
  	this.flyingRadius = this.pole.scaledSizeX()
  	this.attached = false;
  	this.flying = true;
  }
})
.init(function(){
  this.on({
  	update: this.update,
  })
})
.dispose(function(){
  
});
