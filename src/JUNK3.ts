//////////////////
for ( let i = 0; i < 9; i++ ) {
  
    pivot.attach( pieces[ i ] );
  
}
  
for ( let i = 0; i < 9; i++ ) {
  
    scene.attach( pivot );
  
};
  
let tween = new TWEEN.Tween(pivot.rotation)
                .to({ x: "-" + Math.PI/2}, 1000)
                .delay(1000)
                .start();

console.log(pivot);
pivot.updateMatrixWorld();

//////////////////