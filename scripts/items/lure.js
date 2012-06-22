/*
	Fishing Lure

	states: attached, flying, floating
*/

re.c('lure')
.requires('image lureSmall.png update mouse force')
.defines({
  color: 'rgb(100, 200, 200)',
  radius: 5,
  state: 'attached',
  castedAngle: 0,
  radiusIncrement: 0,


  setPole: function(pole) {
  	this.pole = pole;
  	this.posX = pole.posX
 	this.posY = pole.posY-(pole.sizeX*pole.scaleX)
  },

  update: function() {
  	if (this.state == 'floating' && re.pressed('mouse:left')) {
  		if (this.posX + this.sizeX/2 >= this.pole.posX + this.pole.scaledSizeX()) {
  			this.flyingRadius -= 1
  		} else {
  			this.velY -= 1;
  			console.log('eslse da parada')
  		}
  	}

  	waterPos = re('water')[0].posY
  	if (this.state == 'flying' && this.posY >= waterPos) {
  		this.state = 'floating'
  		this.pole.state = 'luring'
  	} else if (this.state == 'floating' && this.posY <= this.pole.posY) {
  		this.pole.state = 'waiting'
  		this.dispose()
  	}

  	switch(this.state) {
  		case 'attached':
  			this.moveFromPole()
  			break;
  		case 'flying':
  			this.moveFlying()
  			break;
  		case 'floating':
			this.moveFloating()
  			break;
  	}

  	if (this.posY > 400 && this.state == 'luring') {
  		this.pole.state = 'waiting'
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
  		this.move(this.castedAngle, this.flyingRadius)
  		console.log('moveFloating')
  	} 
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
  	this.state = 'flying'
  }
})
.init(function(){
  this.on({
  	update: this.update,
  })
})
.dispose(function(){
  
});
