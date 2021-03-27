for ( let i = 0; i < 9; i++ ) {
  
    pivot.attach( pieces[ i ] );
  
  }
  
  var tween = new TWEEN.Tween(pivot.rotation)
                  .to({ y: "-" + Math.PI/2}, 1000)
                  .delay(1000)
                  .onComplete(function() {
                      if (Math.abs(pivot.rotation.y)>=2*Math.PI) {
                          pivot.rotation.y = pivot.rotation.y % (2*Math.PI);
                      }
                  })
                  .start();
  tween.repeat(Infinity);