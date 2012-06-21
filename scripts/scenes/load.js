re.scene('load')
.enter(function(){

//setup gravity
  re.force.graY = 30 * re.sys.stepSize;
  
  re.load(re.assets)
  .complete(function(){
    
    re.scene('home').enter();
    
  });
  
});