"use strict";
exports.__esModule = true;
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
        var row1 = this.faces[faceNum].map(function (x) { return x[0]; }).reverse();
        var row2 = this.faces[faceNum].map(function (x) { return x[1]; }).reverse();
        var row3 = this.faces[faceNum].map(function (x) { return x[2]; }).reverse();
        this.faces[faceNum][0] = row1;
        this.faces[faceNum][1] = row2;
        this.faces[faceNum][2] = row3;
    };
    Cube.prototype.rotateFaceCounterClockwise = function (faceNum) {
        var row1 = this.faces[faceNum].map(function (x) { return x[0]; });
        var row2 = this.faces[faceNum].map(function (x) { return x[1]; });
        var row3 = this.faces[faceNum].map(function (x) { return x[2]; });
        this.faces[faceNum][0] = row3;
        this.faces[faceNum][1] = row2;
        this.faces[faceNum][2] = row1;
    };
    //DONE
    Cube.prototype.moveU = function () {
        this.rotateFaceClockwise(0);
        var tempRow = this.faces[3][0];
        this.faces[3][0] = this.faces[5][0];
        this.faces[5][0] = this.faces[2][0];
        this.faces[2][0] = this.faces[4][0];
        this.faces[4][0] = tempRow;
    };
    //DONE
    Cube.prototype.moveUPrime = function () {
        this.rotateFaceCounterClockwise(0);
        var tempRow = this.faces[3][0];
        this.faces[3][0] = this.faces[4][0];
        this.faces[4][0] = this.faces[2][0];
        this.faces[2][0] = this.faces[5][0];
        this.faces[5][0] = tempRow;
    };
    //DONE
    Cube.prototype.moveD = function () {
        this.rotateFaceClockwise(1);
        var tempRow = this.faces[3][2];
        this.faces[3][2] = this.faces[4][2];
        this.faces[4][2] = this.faces[2][2];
        this.faces[2][2] = this.faces[5][2];
        this.faces[5][2] = tempRow;
    };
    Cube.prototype.moveDPrime = function () {
        this.rotateFaceCounterClockwise(1);
        var tempRow = this.faces[3][2];
        this.faces[3][2] = this.faces[5][2];
        this.faces[5][2] = this.faces[2][2];
        this.faces[2][2] = this.faces[4][2];
        this.faces[4][2] = tempRow;
    };
    Cube.prototype.moveR = function () {
        this.rotateFaceClockwise(5);
        var tempColumn = this.getColumn(3, 2);
        this.setColumn(3, 2, this.getColumn(1, 2));
        this.setColumn(1, 2, this.getColumn(2, 2));
        this.setColumn(2, 2, this.getColumn(0, 2));
        this.setColumn(0, 2, tempColumn);
    };
    Cube.prototype.moveRPrime = function () {
        this.rotateFaceCounterClockwise(5);
        var tempColumn = this.getColumn(3, 2);
        this.setColumn(3, 2, this.getColumn(0, 2));
        this.setColumn(0, 2, this.getColumn(2, 2));
        this.setColumn(2, 2, this.getColumn(1, 2));
        this.setColumn(1, 2, tempColumn);
    };
    Cube.prototype.moveL = function () {
    };
    Cube.prototype.moveLPrime = function () {
        this.rotateFaceCounterClockwise(4);
        var tempColumn = this.getColumn(3, 0);
        this.setColumn(3, 0, this.getColumn(0, 0));
        this.setColumn(0, 0, this.getColumn(2, 0));
        this.setColumn(2, 0, this.getColumn(1, 0));
        this.setColumn(1, 0, tempColumn);
    };
    Cube.prototype.moveF = function () {
        this.rotateFaceCounterClockwise(3);
        var tempRow = this.getRow(0, 2);
        this.setRow(0, 2, this.getColumn(4, 2).reverse());
        this.setColumn(4, 2, this.getRow(1, 0));
        this.setRow(1, 0, this.getColumn(5, 0).reverse());
        this.setRow(column());
    };
    Cube.prototype.moveB = function () {
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
        console.log("");
    };
    return Cube;
}());
var testCube = new Cube();
testCube.printFaces();
testCube.moveRPrime();
testCube.printFaces();
