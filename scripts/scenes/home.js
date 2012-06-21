re.scene('home')
.enter(function(){
  //stop the browser from moving around
  re.preventDefault('a');

  this.level = re('level1.tmx')[0]
  this.level.build()
  
  pole = re.e('pole')
  .attr('posX', 250)
  // .alignHor()
  .alignVer();


  re.e('text align')
  .text('Click to cast!')
  .alignTop(5)
  .alignLeft(5);
  
});