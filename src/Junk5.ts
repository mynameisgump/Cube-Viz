tween = new TWEEN.Tween(pivot.rotation)
.to({ x: "-" + Math.PI/2}, 250)
.start()
.onComplete(function() {
  pivot.rotation.set(0,0,0);
  //testCube.moveR();
  //setR(pieces,testCube);
  //setU(pieces,testCube);
  //setF(pieces,testCube);
  //setB(pieces,testCube);
  //setD(pieces,testCube);
});;




switch(e.key) {

    case 'l':
      pieces.filter(filterR).forEach(function (piece) {pivot.add( piece )});
      //tempPieces = pieces.filter(filterR);
      //tempPieces.forEach(function (piece) {pivot.add( piece )});
      scene.attach( pivot );
      tween = new TWEEN.Tween(pivot.rotation)
                .to({ x: "-" + Math.PI/2}, 250)
                .start()
                .onComplete(function() {
                  pivot.rotation.set(0,0,0);
                  testCube.moveR();
                  setR(pieces,testCube);
                  setU(pieces,testCube);
                  setF(pieces,testCube);
                  setB(pieces,testCube);
                  setD(pieces,testCube);
                });;
    	break;
