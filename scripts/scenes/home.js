re.scene('home')
.enter(function(){
  //stop the browser from moving around
  re.preventDefault('a');

  this.level = re('level1.tmx')[0]
  // this.level.build()
  
  var water = re.e('water')
  re.e('cliff')
  

  re.e('line')

  pole = re.e('pole')
  .attr('posX', 210)
  .attr('posY', 130)
  re.e('hero')

  
  re.e('text align')
  .text('Click to cast!')
  .alignTop(5)
  .alignLeft(5);
  
});