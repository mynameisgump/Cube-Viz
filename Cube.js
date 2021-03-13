var Cube = /** @class */ (function () {
    //private rows: number;
    //private columns: number;
    // 0 - White/Top
    // 1 - Yellow/Bottom
    // 2 - Orange/
    // 3 - Red/Front
    // 4 - Green/Left
    // 5 - Blue/Right
    function Cube() {
        this.faces = [
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
            [[2, 2, 2], [2, 2, 2], [2, 2, 2]],
            [[3, 3, 3], [3, 3, 3], [3, 3, 3]],
            [[4, 4, 4], [4, 4, 4], [4, 4, 4]],
            [[5, 5, 5], [5, 5, 5], [5, 5, 5]]
        ];
        //this.data = this.faces[0].map(x => x[0])
    }
    Cube.prototype.setColumn = function (faceNum, columnNum, newColumn) {
        var _this = this;
        // Sets a column in a face
        this.faces[faceNum].map(function (x) { return x[columnNum] = newColumn[_this.faces[faceNum].indexOf(x)]; });
    };
    Cube.prototype.getColumn = function (faceNum, columnNum) {
        var returnColumn = this.faces[faceNum].map(function (x) { return x[columnNum]; });
        return returnColumn;
    };
    Cube.prototype.setRow = function (faceNum, rowNum, newRow) {
        this.faces[faceNum][rowNum] = newRow;
    };
    Cube.prototype.getRow = function (faceNum, rowNum) {
        var returnRow = this.faces[faceNum][rowNum];
        return returnRow;
    };
    Cube.prototype.rotateFaceClockwise = function (faceNum) {
    };
    Cube.prototype.moveU = function () {
    };
    Cube.prototype.moveL = function () {
    };
    Cube.prototype.moveR = function () {
    };
    Cube.prototype.makeFaceString = function (faceNum) {
    };
    Cube.prototype.printFaces = function () {
        console.log("   " + this.faces[2][0].join("") + "   ");
        console.log("   " + this.faces[2][1].join("") + "   ");
        console.log("   " + this.faces[2][2].join("") + "   ");
        console.log(this.faces[4][0].join("") + this.faces[0][0].join("") + this.faces[5][0].join(""));
        console.log(this.faces[4][1].join("") + this.faces[0][1].join("") + this.faces[5][1].join(""));
        console.log(this.faces[4][2].join("") + this.faces[0][2].join("") + this.faces[5][2].join(""));
        console.log("   " + this.faces[3][0].join("") + "   ");
        console.log("   " + this.faces[3][1].join("") + "   ");
        console.log("   " + this.faces[3][2].join("") + "   ");
        console.log("   " + this.faces[1][0].join("") + "   ");
        console.log("   " + this.faces[1][1].join("") + "   ");
        console.log("   " + this.faces[1][2].join("") + "   ");
    };
    return Cube;
}());
var testCube = new Cube();
testCube.printFaces();
