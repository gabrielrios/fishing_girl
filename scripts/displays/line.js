re.c('line')
.requires('draw')
.defines({
	draw: function(c) {
		pole = re('pole').first()
		lure = re('lure').first()

		if (pole && lure && (['flying', 'floating'].indexOf(lure.state) >= 0)) {
			pAngle = pole.rotation
			pHip = pole.scaledSizeX()
		  	angle = degreeToRadian(pAngle*-1)
		  	hip = pHip
		  	co = Math.sin(angle)*hip
			ca = Math.cos(angle)*hip

			c.strokeStyle = "#000000";
			c.lineWidth = 0.1
			c.beginPath();
			c.moveTo(pole.posX + ca, pole.posY - co + 5)
			c.lineTo(lure.posX + lure.sizeX/2, lure.posY + lure.sizeY/2)
			c.closePath()
			c.stroke()
		}
		return this;
	}
})