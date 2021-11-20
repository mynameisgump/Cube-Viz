export class Cube {
  faces: Array<Array<Array<number>>>;
  //private rows: number;
  //private columns: number;
  // 0 - White/Top
  // 1 - Yellow/Bottom
  // 2 - Orange/Back
  // 3 - Red/Front
  // 4 - Green/Left
  // 5 - Blue/Right

  constructor() {
    this.faces = [
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ],
      [
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
      ],
      [
        [3, 3, 3],
        [3, 3, 3],
        [3, 3, 3],
      ],
      [
        [4, 4, 4],
        [4, 4, 4],
        [4, 4, 4],
      ],
      [
        [5, 5, 5],
        [5, 5, 5],
        [5, 5, 5],
      ],
    ];
    //this.data = this.faces[0].map(x => x[0])
  }

  setColumn(faceNum: number, columnNum: number, newColumn: Array<number>) {
    // Sets a column in a face
    this.faces[faceNum].map(
      (x) => (x[columnNum] = newColumn[this.faces[faceNum].indexOf(x)])
    );
  }

  getColumn(faceNum: number, columnNum: number) {
    let returnColumn = this.faces[faceNum].map((x) => x[columnNum]);
    return returnColumn;
  }

  setRow(faceNum: number, rowNum: number, newRow: Array<number>) {
    this.faces[faceNum][rowNum] = newRow;
  }

  getRow(faceNum: number, rowNum: number) {
    let returnRow = this.faces[faceNum][rowNum];
    return returnRow;
  }

  getfaceR(){
    return this.faces[5];
  }
  getfaceL(){
    return this.faces[4];
  }
  getfaceU(){
    return this.faces[0];
  }
  getfaceD(){
    return this.faces[1];
  }
  getfaceF(){
    return this.faces[3];
  }
  getfaceB(){
    return this.faces[2];
  }

  rotateFaceClockwise(faceNum: number) {
    let row1 = this.faces[faceNum].map((x) => x[0]).reverse();
    let row2 = this.faces[faceNum].map((x) => x[1]).reverse();
    let row3 = this.faces[faceNum].map((x) => x[2]).reverse();

    this.faces[faceNum][0] = row1;
    this.faces[faceNum][1] = row2;
    this.faces[faceNum][2] = row3;
  }

  rotateFaceCounterClockwise(faceNum: number) {
    let row1 = this.faces[faceNum].map((x) => x[0]);
    let row2 = this.faces[faceNum].map((x) => x[1]);
    let row3 = this.faces[faceNum].map((x) => x[2]);

    this.faces[faceNum][0] = row3;
    this.faces[faceNum][1] = row2;
    this.faces[faceNum][2] = row1;
  }

  //DONE
  moveU() {
    this.rotateFaceClockwise(0);
    let tempRow = this.faces[3][0];
    this.faces[3][0] = this.faces[5][0];
    this.faces[5][0] = this.faces[2][0];
    this.faces[2][0] = this.faces[4][0];
    this.faces[4][0] = tempRow;
  }

  //DONE
  moveUPrime() {
    this.rotateFaceCounterClockwise(0);
    let tempRow = this.faces[3][0];
    this.faces[3][0] = this.faces[4][0];
    this.faces[4][0] = this.faces[2][0];
    this.faces[2][0] = this.faces[5][0];
    this.faces[5][0] = tempRow;
  }

  //DONE
  moveD() {
    this.rotateFaceClockwise(1);
    let tempRow = this.faces[3][2];
    this.faces[3][2] = this.faces[4][2];
    this.faces[4][2] = this.faces[2][2];
    this.faces[2][2] = this.faces[5][2];
    this.faces[5][2] = tempRow;
  }

  moveDPrime() {
    this.rotateFaceCounterClockwise(1);
    let tempRow = this.faces[3][2];
    this.faces[3][2] = this.faces[5][2];
    this.faces[5][2] = this.faces[2][2];
    this.faces[2][2] = this.faces[4][2];
    this.faces[4][2] = tempRow;
  }

  moveR() {
    this.rotateFaceClockwise(5);
    let tempColumn = this.getColumn(3, 2);
    this.setColumn(3, 2, this.getColumn(1, 2));
    this.setColumn(1, 2, this.getColumn(2, 0).reverse());
    this.setColumn(2, 0, this.getColumn(0, 2).reverse());
    this.setColumn(0, 2, tempColumn);
  }

  moveRPrime() {
    this.rotateFaceCounterClockwise(5);
    let tempColumn = this.getColumn(3, 2);
    this.setColumn(3, 2, this.getColumn(0, 2));
    this.setColumn(0, 2, this.getColumn(2, 0).reverse());
    this.setColumn(2, 0, this.getColumn(1, 2).reverse());
    this.setColumn(1, 2, tempColumn);
  }

  moveL() {
    this.rotateFaceClockwise(4);
    let tempColumn = this.getColumn(0, 0);
    this.setColumn(0, 0, this.getColumn(2, 2).reverse());
    this.setColumn(2, 2, this.getColumn(1, 0).reverse());
    this.setColumn(1, 0, this.getColumn(3, 0));
    this.setColumn(3, 0, tempColumn);
  }

  moveLPrime() {
    this.rotateFaceCounterClockwise(4);
    let tempColumn = this.getColumn(0, 0);
    this.setColumn(0, 0, this.getColumn(3, 0));
    this.setColumn(3, 0, this.getColumn(1, 0));
    this.setColumn(1, 0, this.getColumn(2, 2).reverse());
    this.setColumn(2, 2, tempColumn.reverse());
  }

  moveF() {
    this.rotateFaceClockwise(3);
    let tempRow = this.getRow(0, 2);
    this.setRow(0, 2, this.getColumn(4, 2).reverse());
    this.setColumn(4, 2, this.getRow(1, 0));
    this.setRow(1, 0, this.getColumn(5, 0).reverse());
    this.setColumn(5, 0, tempRow);
  }

  moveFPrime() {
    this.rotateFaceCounterClockwise(3);
    let tempRow = this.getRow(0, 2).reverse();
    this.setRow(0, 2, this.getColumn(5, 0));
    this.setColumn(5,0,this.getRow(1,0).reverse());
    this.setRow(1,0, this.getColumn(4,2))
    this.setColumn(4, 2, tempRow)
  }

  moveB() {
    this.rotateFaceClockwise(2);
    let tempRow = this.getRow(0, 0);
    this.setRow(0, 0, this.getColumn(5, 2));
    this.setColumn(5, 2, this.getRow(1, 2).reverse());
    this.setRow(1, 2, this.getColumn(4, 0));
    this.setColumn(4, 0, tempRow.reverse());
  }

  moveBPrime() {
    this.rotateFaceCounterClockwise(2);
    let tempRow = this.getRow(0, 0);
    this.setRow(0, 0, this.getColumn(4, 0).reverse());
    this.setColumn(4, 0, this.getRow(1,2));
    this.setRow(1, 2, this.getColumn(5,2).reverse());
    this.setColumn(5, 2, tempRow)
  }

  printFaces() {
    console.log("   " + this.faces[2][0].join("") + "   ");
    console.log("   " + this.faces[2][1].join("") + "   ");
    console.log("   " + this.faces[2][2].join("") + "   ");

    console.log(
      this.faces[4][0].join("") +
        this.faces[0][0].join("") +
        this.faces[5][0].join("")
    );
    console.log(
      this.faces[4][1].join("") +
        this.faces[0][1].join("") +
        this.faces[5][1].join("")
    );
    console.log(
      this.faces[4][2].join("") +
        this.faces[0][2].join("") +
        this.faces[5][2].join("")
    );

    console.log("   " + this.faces[3][0].join("") + "   ");
    console.log("   " + this.faces[3][1].join("") + "   ");
    console.log("   " + this.faces[3][2].join("") + "   ");

    console.log("   " + this.faces[1][0].join("") + "   ");
    console.log("   " + this.faces[1][1].join("") + "   ");
    console.log("   " + this.faces[1][2].join("") + "   ");

    console.log("");
  }
}

//Testing Code
//let testCube = new Cube();
//testCube.printFaces();
//testCube.moveRPrime();
//testCube.printFaces();
