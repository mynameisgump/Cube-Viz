import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";
import { Object3D } from "three";
import * as TWEEN from "@tweenjs/tween.js"
import { Cube } from "./Cube";

let testCube = new Cube();
testCube.printFaces();
 

const grey = "#808080";
const red = "#ff0000";
const white = "#ffffff";
const green = "#00ff00";
const blue = "#0000ff";
const yellow = "#ffff00";
const orange = "#ff6500";
const black = "#000000";
const turq = "#30D5C8";

const cubeColor = {
  "0": white,
  "1": yellow,
  "2": orange,
  "3": red,
  "4": green,
  "5": blue,
};

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);
document.body.appendChild(renderer.domElement);

document.body.addEventListener('keydown', keyPressed);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);

const pieceGeometry = new THREE.BoxGeometry(0.88, 0.88, 0.88);

const edges = new THREE.EdgesGeometry(pieceGeometry);

const lineMat = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 50 });



//////////////////////////
let pivot = new THREE.Object3D()
pivot.rotation.set( 0, 0, 0 );
pivot.updateMatrixWorld();
////////////////////////////

let pieces = [];

for (let i = 0; i < 27; i++) {
  let size = 6;
  let materialz = new Array(6);
  while (size--)
    materialz[size] = new THREE.MeshBasicMaterial({ color: black });
  if (i < 9) {
    materialz[1] = new THREE.MeshBasicMaterial({ color: green });
  }
  if (i > 17) {
    materialz[0] = new THREE.MeshBasicMaterial({ color: blue });
  }
  if (i % 3 == 0) {
    materialz[5] = new THREE.MeshBasicMaterial({ color: orange });
  }
  if (i % 3 == 2) {
    materialz[4] = new THREE.MeshBasicMaterial({ color: red });
  }
  if (i % 9 <= 2) {
    materialz[3] = new THREE.MeshBasicMaterial({ color: yellow });
  }
  if (i % 9 >= 6) {
    materialz[2] = new THREE.MeshBasicMaterial({ color: white });
  }

  pieces.push(new THREE.Mesh(pieceGeometry, materialz));
}
let curPiece = 0;
for (let x = -1; x < 2; x++) {
  for (let y = -1; y < 2; y++) {
    for (let z = -1; z < 2; z++) {
      pieces[curPiece].position.set(x, y, z);

      let line = new THREE.LineSegments(edges, lineMat);
      line.renderOrder = 1;
      pieces[curPiece].add(line);

      curPiece++;
    }
  }
}

for (let i = 0; i < 27; i++) {
  scene.add(pieces[i]);
}





camera.position.z = 5;

controls.update();

export const animate = () => {
  requestAnimationFrame(animate);
  TWEEN.update();
  renderer.render(scene, camera);
};


function getR(pieces: any[]){

}

function getL(pieces: any[]){
  return pieces.slice(0,9);
}


function keyPressed(e: any){
  let pivot = new THREE.Object3D()
  pivot.rotation.set( 0, 0, 0 );
  pivot.updateMatrixWorld();
  
  switch(e.key) {

  	case 'ArrowUp':
      let uPieces = pieces.filter(filterU);
      uPieces.forEach(function (piece) {pivot.add( piece )});
      console.log("BEGIN")
      console.log(pieces)
      console.log(uPieces)
      console.log("END")
      scene.attach( pivot );
      let tween = new TWEEN.Tween(pivot.rotation)
                .to({ y: "-" + Math.PI/2}, 1000)
                .start()
                .onComplete(function() {
                  //setColors(pieces,testCube);
                  pivot.rotation.set(0,0,0);
                  testCube.moveU();
                  setU(pieces,testCube);
                  setR(pieces,testCube);
                  setF(pieces,testCube);
                  //setU(pieces,testCube);
                });;
      //tween.start();
    	break;

    case 'ArrowDown':
    	for ( let i = 0; i < 9; i++ ) {
        pivot.attach( pieces[ i ] );
      }
      scene.attach( pivot );
      tween = new TWEEN.Tween(pivot.rotation)
                .to({ x: "-" + Math.PI/2}, 1000)
                .start();
    	break;

    case 'ArrowLeft':

      for ( let i = 0; i < 9; i++ ) {
        pivot.add( pieces[ i ] );
      }
      scene.attach( pivot );
      tween = new TWEEN.Tween(pivot.rotation)
                .to({ x: "-" + Math.PI/2}, 1000)
                .start()
                .onComplete(function() {
                  console.log('done!')
                });
    	//.rotateY(-0.1);
    	break;

    case 'ArrowRight':
      console.log(pivot);
    	for ( let i = 18; i < 28; i++) {
        pivot.add( pieces[ i ] );
      }
      console.log(pivot);
      scene.attach( pivot );
      tween = new TWEEN.Tween(pivot.rotation)
                .to({ x: "-" + Math.PI/2}, 1000)
                .start()
                .onComplete(function() {
                  //setColors(pieces,testCube);
                  testCube.printFaces();
                  pivot.rotation.set(0,0,0);
                  testCube.moveR();
                  testCube.printFaces();
                  setR(pieces,testCube);
                  setU(pieces,testCube);
                  setF(pieces,testCube);
                  setB(pieces,testCube);
                  setD(pieces,testCube);

                  //setU(pieces,testCube);
                });;
    	break;
  }
  e.preventDefault();
  animate();
}

console.log(pieces);


function setR(pieces: any[], backendCube: Cube){
  let rPieces = pieces.filter(filterR);
  let rVals = backendCube.getfaceR();
  //let rVals = [[3,2,3],[1,5,5],[1,2,2]];
  //newArr.reverse();
  
  //Alternative arrary to order in correct position
  let newArr = [];
  for(var i = 0; i < rVals.length; i++)
  {
      newArr = newArr.concat(rVals[i].reverse());
  }

  rPieces.forEach(function (piece, index){
    console.log(cubeColor[newArr[index]]);
    piece.material[0] = new THREE.MeshBasicMaterial({ color: cubeColor[newArr[index]] });
  })

  //pieces.splice(17,9,rPieces);
}

function filterR(element, index, array){
  return (index > 17);

}

// TODO
function setL(pieces: any[], backendCube: Cube){
  let rPieces = pieces.filter(filterR);
  //let rVals = backendCube.getfaceR();
  let rVals = [[3,2,3],[1,5,5],[1,2,2]];
  //let rVals = [["3","2","3"],["1","5","5"],["1","2","2"]];
  
  //newArr.reverse();
  let newArr = [];
  for(var i = 0; i < rVals.length; i++)
  {
      newArr = newArr.concat(rVals[i].reverse());
  }

  rPieces.forEach(function (piece, index){
    console.log(cubeColor[newArr[index]]);
    piece.material[0] = new THREE.MeshBasicMaterial({ color: cubeColor[newArr[index]] });
  })

  pieces.splice(17,9);
}


function filterL(element, index, array){
  return (index < 9);
}

// TODO:
function setU(pieces: any[], backendCube: Cube){
  let rPieces = pieces.filter(filterU);
  let rVals = backendCube.getfaceU();
  //let rVals = [[3,2,3],[1,5,5],[1,2,2]];
  //newArr.reverse();
  let row1 = rVals.map((x) => x[0]).reverse();
  let row2 = rVals.map((x) => x[1]).reverse();
  let row3 = rVals.map((x) => x[2]).reverse();
  
  let newArr = [];
  newArr = newArr.concat(row1,row2,row3);

  rPieces.forEach(function (piece, index){
    console.log(cubeColor[newArr[index]]);
    piece.material[2] = new THREE.MeshBasicMaterial({ color: cubeColor[newArr[index]] });
  })

  //pieces.splice(17,9,rPieces);
}

function filterU(element, index, array){
  return (index % 9 >= 6);
}

function setD(pieces: any[], backendCube: Cube){
  let rPieces = pieces.filter(filterD);
  let rVals = backendCube.getfaceD();
  //let rVals = [[3,2,3],[1,5,5],[1,2,2]];
  //newArr.reverse();
  console.log(rVals);
  let row1 = rVals.map((x) => x[0]).reverse();
  let row2 = rVals.map((x) => x[1]).reverse();
  let row3 = rVals.map((x) => x[2]).reverse();
  
  let newArr = [];
  newArr = newArr.concat(row1,row2,row3);

  rPieces.forEach(function (piece, index){
    console.log(cubeColor[newArr[index]]);
    piece.material[3] = new THREE.MeshBasicMaterial({ color: cubeColor[newArr[index]] });
  })

  //pieces.splice(17,9,rPieces);
}
function filterD(element, index, array){
  return (index % 9 <= 2)
}

function setF(pieces: any[], backendCube: Cube){
  let rPieces = pieces.filter(filterF);
  let rVals = backendCube.getfaceF();
  //let rVals = [[3,2,3],[1,5,5],[1,2,2]];
  //newArr.reverse();
  console.log(rVals);
  let row1 = rVals.map((x) => x[0]).reverse();
  let row2 = rVals.map((x) => x[1]).reverse();
  let row3 = rVals.map((x) => x[2]).reverse();
  
  let newArr = [];
  newArr = newArr.concat(row1,row2,row3);

  rPieces.forEach(function (piece, index){
    console.log(cubeColor[newArr[index]]);
    piece.material[4] = new THREE.MeshBasicMaterial({ color: cubeColor[newArr[index]] });
  })

  //pieces.splice(17,9,rPieces);
}


function filterF(element, index, array){
  return (index % 3 == 2)
}

function setB(pieces: any[], backendCube: Cube){
  let rPieces = pieces.filter(filterB);
  let rVals = backendCube.getfaceB();
  //let rVals = [[3,2,3],[1,5,5],[1,2,2]];
  //newArr.reverse();
  console.log(rVals);
  let row1 = rVals.map((x) => x[0]).reverse();
  let row2 = rVals.map((x) => x[1]).reverse();
  let row3 = rVals.map((x) => x[2]).reverse();
  
  let newArr = [];
  newArr = newArr.concat(row1,row2,row3);

  rPieces.forEach(function (piece, index){
    console.log(cubeColor[newArr[index]]);
    piece.material[5] = new THREE.MeshBasicMaterial({ color: cubeColor[newArr[index]] });
  })

  //pieces.splice(17,9,rPieces);
}
function filterB(element, index, array){
  return(index % 3 == 0);
}