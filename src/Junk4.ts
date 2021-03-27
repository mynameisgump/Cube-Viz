function setColors(pieces: any[], backendCube: Cube){
    let size = 6;
    for (let i = 0; i < 28; i++) {
      pieces[i].rotation.set(0,0,0);
      let size = 6;
      let materials = new Array(6);
      while (size--)
        //pieces[i].material[size] = new THREE.MeshBasicMaterial({ color: black });
        materials[size] = new THREE.MeshBasicMaterial({ color: black });
        if (i < 9) {
          //pieces[i].material[1] = new THREE.MeshBasicMaterial({ color: green });
          materials[1] = new THREE.MeshBasicMaterial({ color: green });
        }
        if (i > 17) {
          //pieces[i].material[0] = new THREE.MeshBasicMaterial({ color: blue });
          materials[0] = new THREE.MeshBasicMaterial({ color: blue });
        }
        if (i % 3 == 0) {
          //pieces[i].material[5] = new THREE.MeshBasicMaterial({ color: turq });
          materials[5] = new THREE.MeshBasicMaterial({ color: turq });
        }
        if (i % 3 == 2) {
          //pieces[i].material[4] = new THREE.MeshBasicMaterial({ color: red });
          materials[4] = new THREE.MeshBasicMaterial({ color: red });
        }
        if (i % 9 <= 2) {
          //pieces[i].material[3] = new THREE.MeshBasicMaterial({ color: yellow });
          materials[3] = new THREE.MeshBasicMaterial({ color: yellow });
        }
        if (i % 9 >= 6) {
          //pieces[i].material[2] = new THREE.MeshBasicMaterial({ color: white });
          materials[2] = new THREE.MeshBasicMaterial({ color: white });
        }
        pieces[i].material = materials;
    }
  
  }