function rotateL(pieces: any){
    for ( let i = 0; i < 9; i++ ) {
  
      pivot.attach( pieces[ i ] );
  
    }
  
    pivot.rotation.set( THREE.MathUtils.degToRad(90), 0, 0 );
    pivot.updateMatrixWorld();
  
    for ( let i = 0; i < 9; i++ ) {
  
        scene.attach( pieces[ i ] );
  
    };
  };