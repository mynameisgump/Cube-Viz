import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";
import { Object3D } from "three";
import * as TWEEN from "@tweenjs/tween.js"
import { Cube } from "./Cube";


let logicCube = new Cube();
logicCube.printFaces();

let lastTween;

let turnQueue: { (): void; }[];
turnQueue = [];

const grey = "#808080";
const red = "#ff0000";
const white = "#ffffff";
const green = "#00ff00";
const blue = "#0000ff";
const yellow = "#ffff00";
const orange = "#ff6500";
const black = "#000000";
const turq = "#30D5C8";

let turningSpeed = 250;

const cubeColor: { [name: number]: string } = {
  0: white,
  1: yellow,
  2: orange,
  3: red,
  4: green,
  5: blue,
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
controls.keys = {
	LEFT: 65, //left arrow
	UP: 87, // up arrow
	RIGHT: 68, // right arrow
	BOTTOM: 83 // down arrow
}
controls.update()
const pieceGeometry = new THREE.BoxGeometry(0.88, 0.88, 0.88);

const edges = new THREE.EdgesGeometry(pieceGeometry);

const lineMat = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 50 });

let turning = false;

//////////////////////////
let pivot = new THREE.Group()
pivot.rotation.set( 0, 0, 0 );
pivot.updateMatrixWorld();
////////////////////////////

let pieces: THREE.Mesh[] = [];

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
  //Timer to check for event on the queue

};

// Turning function check
// Done in animate
// If currently no turn set to turn
// check for completled turn
// once turn completet shift next in queueu

function cubeTurn(){
  //turnQueue
  while(turnQueue.length > 0) {
    if(turning == false){
      console.log("Loop")
      console.log(turnQueue.length)
      let turn = turnQueue.shift();
      if (typeof turn != 'undefined'){
        console.log("Before")
        turn();
        console.log("After")
      }
    }
  } 
}

async function aCubeTurn(){

}

function keyPressed(e: any){

  let pivot = new THREE.Group();
  pivot.updateMatrixWorld();
  
  let tween;

  switch(e.key) {
    //R
    case 'l':
      if(!turning){
        turning = true;
        pieces.filter(filterR).forEach(function (piece) {pivot.add( piece )});
        scene.attach( pivot );
        tween = new TWEEN.Tween(pivot.rotation)
                  .to({ x: "-" + Math.PI/2}, turningSpeed)
                  .start()
                  .onComplete(function() {
                    pivot.rotation.set(0,0,0);
                    logicCube.moveR();
                    setFaces(pieces,logicCube);
                    turning = false;
                  });;
        break;
      }
      else{
        break;
      }

    //R'
    case 'L':
      if(!turning){
        turning = true;
        pieces.filter(filterR).forEach(function (piece) {pivot.add( piece )});
        scene.attach( pivot );
        tween = new TWEEN.Tween(pivot.rotation)
                  .to({ x: "+" + Math.PI/2}, turningSpeed)
                  .start()
                  .onComplete(function() {
                    pivot.rotation.set(0,0,0);
                    logicCube.printFaces();
                    logicCube.moveRPrime();
                    logicCube.printFaces();
                    setFaces(pieces,logicCube);
                    turning = false;
                  });;
                  break;
      }
      else{
        break;
      }
    //D
    case 'k':
      if(!turning){
        turning = true;
        pieces.filter(filterD).forEach(function (piece) {pivot.add( piece )});
        scene.attach( pivot );
        tween = new TWEEN.Tween(pivot.rotation)
                  .to({ y: "+" + Math.PI/2}, turningSpeed)
                  .start()
                  .onComplete(function() {
                    pivot.rotation.set(0,0,0);
                    logicCube.moveD();
                    setFaces(pieces,logicCube);
                    turning = false;
                  });;
        break;
      }
      else{
        break;
      }


    //D'
    case 'K':
      if(!turning){
        turning = true;
        pieces.filter(filterD).forEach(function (piece) {pivot.add( piece )});
        scene.attach( pivot );
        tween = new TWEEN.Tween(pivot.rotation)
                  .to({ y: "-" + Math.PI/2}, turningSpeed)
                  .start()
                  .onComplete(function() {
                    pivot.rotation.set(0,0,0);
                    logicCube.moveDPrime();
                    setFaces(pieces,logicCube);
                    turning = false;
                  });;
        break;
        
      }
      else{
        break;
      }
      

    //U
    case 'j':
      if(!turning){
        turning = true;
        pieces.filter(filterU).forEach(function (piece) {pivot.add( piece )});
        scene.attach( pivot );
        tween = new TWEEN.Tween(pivot.rotation)
                  .to({ y: "-" + Math.PI/2}, turningSpeed)
                  .start()
                  .onComplete(function() {
                    pivot.rotation.set(0,0,0);
                    logicCube.moveU();
                    setFaces(pieces,logicCube);
                    turning = false;
                  });;
        break;
      }
      else{
        break;
      }
      

    //U'
    case 'J':
      if(!turning){
        turning = true;
        pieces.filter(filterU).forEach(function (piece) {pivot.add( piece )});
        scene.attach( pivot );
        tween = new TWEEN.Tween(pivot.rotation)
                  .to({ y: "+" + Math.PI/2}, turningSpeed)
                  .start()
                  .onComplete(function() {
                    pivot.rotation.set(0,0,0);
                    logicCube.moveUPrime();
                    setFaces(pieces,logicCube);
                    turning = false;
                  });;
        break;
      }
      else{
        break;
      }
      
    //L
    case 'h':
      if(!turning){
        turning = true;
        pieces.filter(filterL).forEach(function (piece) {pivot.add( piece )});
        scene.attach( pivot );
        tween = new TWEEN.Tween(pivot.rotation)
                  .to({ x: "+" + Math.PI/2}, turningSpeed)
                  .start()
                  .onComplete(function() {
                    pivot.rotation.set(0,0,0);
                    logicCube.moveL();
                    setFaces(pieces,logicCube);
                    turning = false;
                  });;
        break;
      }
      else{
        break;
      }
      
    //L'
    case 'H':
      if(!turning){
        turning = true;
        pieces.filter(filterL).forEach(function (piece) {pivot.add( piece )});
        scene.attach( pivot );
        tween = new TWEEN.Tween(pivot.rotation)
                  .to({ x: "-" + Math.PI/2}, turningSpeed)
                  .start()
                  .onComplete(function() {
                    pivot.rotation.set(0,0,0);
                    logicCube.moveLPrime();
                    setFaces(pieces,logicCube);
                    turning = false;
                  });;
        break;
      }
      else{
        break;
      }
      

    //F
    case 'u':
      if(!turning){
        turning = true;
        pieces.filter(filterF).forEach(function (piece) {pivot.add( piece )});
        scene.attach( pivot );
        tween = new TWEEN.Tween(pivot.rotation)
                  .to({ z: "-" + Math.PI/2}, turningSpeed)
                  .start()
                  .onComplete(function() {
                    pivot.rotation.set(0,0,0);
                    logicCube.moveF();
                    setFaces(pieces,logicCube);
                    turning = false;
                  });;
        break;
      }
      else{
        break;
      }
      

    //F'
    case 'U':
      if(!turning){
        turning = true;
        pieces.filter(filterF).forEach(function (piece) {pivot.add( piece )});
        scene.attach( pivot );
        tween = new TWEEN.Tween(pivot.rotation)
                  .to({ z: "+" + Math.PI/2}, turningSpeed)
                  .start()
                  .onComplete(function() {
                    pivot.rotation.set(0,0,0);
                    logicCube.moveFPrime();
                    setFaces(pieces,logicCube);

                    turning = false;
                  });;
        break;
      }
      else{
        break;
      }
      

    // B
    case 'i':
      if(!turning){
        turning = true;
        pieces.filter(filterB).forEach(function (piece) {pivot.add( piece )});
        scene.attach( pivot );
        tween = new TWEEN.Tween(pivot.rotation)
                  .to({ z: "+" + Math.PI/2}, turningSpeed)
                  .start()
                  .onComplete(function() {
                    pivot.rotation.set(0,0,0);
                    logicCube.moveB();
                    setFaces(pieces,logicCube);
                    turning = false;
                  });;
        break;
        
      }
      else{
        break;
      }
      

    //B Prime
    case 'I':
      if(!turning){
        turning = true;
        pieces.filter(filterB).forEach(function (piece) {pivot.add( piece )});
        scene.attach( pivot );
        tween = new TWEEN.Tween(pivot.rotation)
                  .to({ z: "-" + Math.PI/2}, turningSpeed)
                  .start()
                  .onComplete(function() {
                    pivot.rotation.set(0,0,0);
                    logicCube.moveBPrime();
                    setFaces(pieces,logicCube);
                    turning = false;
                  });;
        break;
      }
      else{
        break;
      }


    
  	case 'w':
      //turnR();
      turnQueue.push(turnR);
      //turnQueue.push(turnR);
      //console.log(turnQueue.length)
      //cubeTurn();
      
    	break;

    case 'a':
    	break;

    case 's':
    	break;

    case 'd':
    	break;

  	case 'ArrowUp':
    	break;

    case 'ArrowDown':
    	break;

    case 'ArrowLeft':
    	break;

    case 'ArrowRight':
    	break;
  }
  e.preventDefault();
  //animate();
}


function turnR(){
  let pivot = new THREE.Group();
  pivot.updateMatrixWorld();
  pieces.filter(filterR).forEach(function (piece) {pivot.add( piece )});
  scene.attach( pivot );
  let tween = new TWEEN.Tween(pivot.rotation)
            .to({ x: "-" + Math.PI/2}, turningSpeed)
            .start()
            .onComplete(function() {
              pivot.rotation.set(0,0,0);
              logicCube.moveR();
              setFaces(pieces,logicCube);
              turning = false;
            });;
  

}

function turnRPrime(){
  let pivot = new THREE.Group();
  pivot.updateMatrixWorld();
  pieces.filter(filterR).forEach(function (piece) {pivot.add( piece )});
  scene.attach( pivot );
  let tween = new TWEEN.Tween(pivot.rotation)
            .to({ x: "+" + Math.PI/2}, turningSpeed)
            .start()
            .onComplete(function() {
              pivot.rotation.set(0,0,0);
              logicCube.printFaces();
              logicCube.moveRPrime();
              logicCube.printFaces();
              setFaces(pieces,logicCube);
              turning = false;
  });;
}


// Function to set the colours of the faces based off of the colours 
// from the cube object
function setFaces(pieces: any[], backendCube: Cube){
  setR(pieces,backendCube);
  setL(pieces,backendCube);
  setU(pieces,backendCube);
  setD(pieces,backendCube);
  setF(pieces,backendCube);
  setB(pieces,backendCube);
}

function setR(pieces: any[], backendCube: Cube){
  let rPieces = pieces.filter(filterR);
  rPieces.reverse();
  let rVals = backendCube.getfaceR();
  
  //Alternative arrary to order in correct position
  let row1 = rVals[0];
  let row2 = rVals[1];
  let row3 = rVals[2];

  let newArr: number[] = [];
  newArr = newArr.concat(row1,row2,row3);
  
  rPieces.forEach(function (piece, index){
    piece.material[0].dispose();
    piece.material[0] = new THREE.MeshBasicMaterial({ color: cubeColor[newArr[index]] });
  })

}

function setL(pieces: any[], backendCube: Cube){
  let rPieces = pieces.filter(filterL);
  let rVals = backendCube.getfaceL();

  let row1 = [...rVals[0]].reverse();
  let row2 = [...rVals[1]].reverse();
  let row3 = [...rVals[2]].reverse();
  let newArr: number[] = [];

  newArr = newArr.concat(row1,row2,row3);

  newArr.reverse();
  rPieces.forEach(function (piece, index){
    piece.material[1].dispose();
    piece.material[1] = new THREE.MeshBasicMaterial({ color: cubeColor[newArr[index]] });
  })

}

function setU(pieces: any[], backendCube: Cube){
  let rPieces = pieces.filter(filterU);
  let rVals = backendCube.getfaceU();
  let tempArr = [];

  let row1 = rVals.map((x) => x[0]);
  let row2 = rVals.map((x) => x[1]);
  let row3 = rVals.map((x) => x[2]);


  let newArr: number[] = [];
  newArr = newArr.concat(row1,row2,row3);

  rPieces.forEach(function (piece, index){
    piece.material[2].dispose();
    piece.material[2] = new THREE.MeshBasicMaterial({ color: cubeColor[newArr[index]] });
  })

}


function setD(pieces: any[], backendCube: Cube){
  let rPieces = pieces.filter(filterD);
  let rVals = backendCube.getfaceD();

  let row1 = rVals.map((x) => x[0]).reverse();
  let row2 = rVals.map((x) => x[1]).reverse();
  let row3 = rVals.map((x) => x[2]).reverse();
  
  let newArr: number[] = [];
  newArr = newArr.concat(row1,row2,row3);

  rPieces.forEach(function (piece, index){
    piece.material[3].dispose();
    piece.material[3] = new THREE.MeshBasicMaterial({ color: cubeColor[newArr[index]] });
  })

}

function setF(pieces: any[], backendCube: Cube){
  let rPieces = pieces.filter(filterF);
  let rVals = backendCube.getfaceF();

  let row1 = rVals.map((x) => x[0]).reverse();
  let row2 = rVals.map((x) => x[1]).reverse();
  let row3 = rVals.map((x) => x[2]).reverse();
  
  let newArr: number[] = [];
  
  newArr = newArr.concat(row1,row2,row3);

  rPieces.forEach(function (piece, index){
    piece.material[4].dispose();
    piece.material[4] = new THREE.MeshBasicMaterial({ color: cubeColor[newArr[index]] });
  })

}


function setB(pieces: any[], backendCube: Cube){
  let rPieces = pieces.filter(filterB);
  rPieces.reverse();
  let rVals = backendCube.getfaceB();
  //let rVals = [[3,2,3],[1,5,5],[1,2,2]];
  //newArr.reverse();
  let row1 = rVals.map((x) => x[0]);
  let row2 = rVals.map((x) => x[1]);
  let row3 = rVals.map((x) => x[2]);
  
  let newArr: number[] = [];
  newArr = newArr.concat(row1,row2,row3);

  rPieces.forEach(function (piece, index){
    piece.material[5].dispose();
    piece.material[5] = new THREE.MeshBasicMaterial({ color: cubeColor[newArr[index]] });
  })

  //pieces.splice(17,9,rPieces);
}

function filterR(_element: THREE.Mesh, index: number){
  return (index > 17);

}

function filterL(_element: THREE.Mesh, index: number){
  return (index < 9);
}

function filterU(_element: THREE.Mesh, index: number){
  return (index % 9 >= 6);
}

function filterD(_element: THREE.Mesh, index: number){
  return (index % 9 <= 2)
}

function filterF(_element: THREE.Mesh, index: number){
  return (index % 3 == 2)
}

function filterB(_element: THREE.Mesh, index: number){
  return(index % 3 == 0);
}

