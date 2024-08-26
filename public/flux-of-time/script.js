info = {
    primaryColor: "#69abaa",
    secondaryColor: "#69abaa",
    tertiaryColor: "#69abaa",
    backgroundColor: "#fffffd",
    textColor: "#1a1a1a",
    secondaryTextColor: "#fffffd",
    uiColor: "#1a1a1a",
    secondaryUiColor: "#fffffd",
    infoComposer: "Gu-dara",
    infoName: "Flux of Time",
    infoSubName: "Gu-dara",
    infoCreator: "IcedDog"
}

songLength = 1612
bpm = 128

script = [{
    name: "background",
    startBeat: 0,
    endBeat: 256,
    script: function (varibles) {
        let colorFlag = true;
        let num = 20;
        background(info.backgroundColor);
        for (let k = 1; k >= 1; k /= 2) {
            {
                let seedBase = str(varibles.nowBeatFloor);
                let length = Abs(1 / num) * k;
                let grid = [];

                strokeWeight(length * 0.25);
                stroke(colorFlag ? info.primaryColor : info.backgroundColor);
                noFill();
                colorFlag = !colorFlag;

                for (let i = 0; i < Math.ceil(windowHeight / length) + 1; i++) {
                    grid.push([]);
                    for (let j = 0; j < Math.ceil(windowWidth / length) + 1; j++) {
                        let seed = seedBase + str(i) + str(j) + str(k);
                        let currentGrid = {
                            up: i != 0 ? grid[i - 1][j].down : false,
                            down: randTrue(seed + "down"),
                            left: j != 0 ? grid[i][j - 1].right : false,
                            right: randTrue(seed + "right")
                        };

                        drawGrid(currentGrid, i * length, j * length, length, seed);

                        grid[i].push(currentGrid);
                    }
                }
            }
        }
    },
    varibles: {
        nowBeatFloor: [
            {
                startBeat: 0,
                endBeat: 256,
                script: function (progress, nowBeat) {
                    return Math.floor(nowBeat);
                }
            }
        ]
    }
}]

// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript/47593316
function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
}

function randTrue(seed, probablity = 0.5) {
    let [h1, h2, h3, h4] = cyrb128(seed);
    return (h1 + h2 + h3 + h4) % 1000 / 1000 < probablity;
}

function randChoice(seed, array) {
    let [h1, h2, h3, h4] = cyrb128(seed);
    let index = Math.floor(h1 / 4294967296 * array.length);
    return array[index];
}

function drawGrid(grid, x, y, length, seed) {
    let array = [grid.up, grid.right, grid.down, grid.left];
    let finalArray = [0, 0, 0, 0]; // 0=None, 1=Curve Counterclockwise, 2=Dot, 3=Straight
    let startIndex = randChoice(seed, [0, 1, 2, 3]);

    for (let i = startIndex; i < startIndex + 4; i++) {
        if (finalArray[(i + 0) % 4] != 0) continue;
        if (array[(i + 0) % 4]) {
            if (array[(i + 1) % 4] && finalArray[(i + 1) % 4] % 2 == 0) {
                if (randTrue(seed + "right", 0.95) && finalArray[(i + 3) % 4] != 1 && finalArray[(i + 1) % 4] != 1) {
                    finalArray[(i + 0) % 4] = 1;
                }
                else {
                    finalArray[(i + 0) % 4] = 2;
                    finalArray[(i + 1) % 4] = 2;
                }
            }
            else if (array[(i + 2) % 4] && finalArray[(i + 2) % 4] % 2 == 0) {
                if (randTrue(seed + "down", 0.95) && finalArray[(i + 1) % 4] != 3 && finalArray[(i + 3) % 4] != 3) {
                    finalArray[(i + 0) % 4] = 3;
                }
                else {
                    finalArray[(i + 0) % 4] = 2;
                    finalArray[(i + 2) % 4] = 2;
                }
            }
            else finalArray[(i + 0) % 4] = 2;
        }
    }

    let squarePointList = [[x + length, y], [x + length, y + length], [x, y + length], [x, y]];
    let angles = [[HALF_PI, PI], [PI, PI + HALF_PI], [PI + HALF_PI, 2 * PI], [0, HALF_PI]];
    let crossPointList = [[x + length / 2, y], [x + length, y + length / 2], [x + length / 2, y + length], [x, y + length / 2]];

    for (let i = 0; i < 4; i++) {
        if (finalArray[i] == 0) continue;
        if (finalArray[i] == 1) arc(crossPointList[i][0], squarePointList[i][1], length, length, angles[i][0], angles[i][1]);
        if (finalArray[i] == 2 && randTrue(seed + "dot", 0.2)) point(crossPointList[i][0], crossPointList[i][1]);
        if (finalArray[i] == 3) line(crossPointList[i][0], crossPointList[i][1], crossPointList[(i + 2) % 4][0], crossPointList[(i + 2) % 4][1]);
    }
}