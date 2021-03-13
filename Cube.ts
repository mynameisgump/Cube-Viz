class Cube {
    faces: Array<Array<Array<number>>>;
    //private rows: number;
    //private columns: number;
    // 0 - White/Top
    // 1 - Yellow/Bottom
    // 2 - Orange/
    // 3 - Red/Front
    // 4 - Green/Left
    // 5 - Blue/Right

    constructor() {
        this.faces = [
                [[0,0,0],[0,0,0],[0,0,0]],
                [[1,1,1],[1,1,1],[1,1,1]],
                [[2,2,2],[2,2,2],[2,2,2]],
                [[3,3,3],[3,3,3],[3,3,3]],
                [[4,4,4],[4,4,4],[4,4,4]],
                [[5,5,5],[5,5,5],[5,5,5]]
            ]
      //this.data = this.faces[0].map(x => x[0])
    }

    setColumn(faceNum: number, columnNum: number, newColumn: Array<number>){
        // Sets a column in a face
        this.faces[faceNum].map(x => x[columnNum] = newColumn[this.faces[faceNum].indexOf(x)]);
    }

    getColumn(faceNum: number, columnNum: number){
        let returnColumn = this.faces[faceNum].map(x => x[columnNum]);
        return returnColumn;
    }

    setRow(faceNum: number, rowNum: number, newRow: Array<number>) {
        this.faces[faceNum][rowNum] = newRow;
    }

    getRow(faceNum: number, rowNum: number) {
        let returnRow = this.faces[faceNum][rowNum];
        return returnRow;
    }

    rotateFaceClockwise(faceNum: number){
        let row1 = this.faces[faceNum].map(x => x[0]).reverse();
        let row2 = this.faces[faceNum].map(x => x[0]).reverse();
        let row3 = this.faces[faceNum].map(x => x[0]).reverse();

        this.faces[faceNum][0] = row1;
        this.faces[faceNum][1] = row1;
        this.faces[faceNum][2] = row1;
    }

    moveU(){
        this.rotateFaceClockwise(0);
        let tempRow = this.faces[3][0];
        this.faces[3][0] = this.faces[5][0];
        this.faces[5][0] = this.faces[2][0];
        this.faces[2][0] = this.faces[4][0];
        this.faces[4][0] = tempRow;
    }

    moveL(){
        
    }

    moveR(){
        
    }

    makeFaceString(faceNum: number){

        
    }

    printFaces(){
        console.log("   "+this.faces[2][0].join("")+"   ");
        console.log("   "+this.faces[2][1].join("")+"   ");
        console.log("   "+this.faces[2][2].join("")+"   ");

        console.log(this.faces[4][0].join("")+this.faces[0][0].join("")+this.faces[5][0].join(""));
        console.log(this.faces[4][1].join("")+this.faces[0][1].join("")+this.faces[5][1].join(""));
        console.log(this.faces[4][2].join("")+this.faces[0][2].join("")+this.faces[5][2].join(""));

        console.log("   "+this.faces[3][0].join("")+"   ");
        console.log("   "+this.faces[3][1].join("")+"   ");
        console.log("   "+this.faces[3][2].join("")+"   ");

        console.log("   "+this.faces[1][0].join("")+"   ");
        console.log("   "+this.faces[1][1].join("")+"   ");
        console.log("   "+this.faces[1][2].join("")+"   ");

        console.log("")

    }


}

let testCube = new Cube();
testCube.printFaces();
testCube.moveU();
testCube.printFaces();