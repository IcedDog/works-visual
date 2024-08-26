
info = {
    primaryColor: "rgb(218,191,187)",
    secondaryColor: "rgb(42,39,126)",
    tertiaryColor: "rgb(255,235,197)",
    backgroundColor: "rgb(8,5,14)",
    textColor: "rgb(255,253,222)",
    secondaryTextColor: "rgb(255,253,222)",
    uiColor: "rgb(255,255,255)",
    secondaryUiColor: "#ffffff",
    infoComposer: "rN",
    infoName: "Ars Cantate",
    infoSubName: "rN",
    infoCreator: "IcedDog"
}

songLength = 524 * 4
maxBpmValue = 600
bpmFontSize = 0.02

script = [
    {
        name: "plot",
        startBeat: 0,
        endBeat: songLength,
        script: function (varibles) {
            background(info.backgroundColor);
            textFont('Comfortaa');
            let now = getDistance(varibles.nowBeat);
            timings.forEach((val, idx) => {
                if (val.distance < now ? (now - val.distance) / windowWidth <= 2 : (val.distance - now) / windowWidth <= 2) {
                    let myDis = (val.distance - now) / windowWidth;
                    if (val.up == 0) {
                        if (idx == 0 ? true : (timings[idx - 1].tsUp != val.tsUp || timings[idx - 1].down != val.down)) {
                            noStroke();
                            textSize(Abs(0.03));
                            textAlign(CENTER, CENTER);
                            fill(info.primaryColor);
                            text(`${val.tsUp}/${val.down}`, RelX(-0.7 + myDis), RelY(0.64));
                        }

                        strokeWeight(Abs(0.004));
                        stroke(info.primaryColor);
                    }
                    else {
                        strokeWeight(Abs(0.002));
                        stroke(info.secondaryColor);
                    }
                    line(RelX(-0.7 + myDis), RelY(0.6), RelX(-0.7 + myDis), RelY(0.6 - (val.bpm / maxBpmValue) * 1.6));
                }
            });
            bpm.forEach((val, idx) => {
                if (val.distance < now && idx != bpm.length - 1 ? (now - bpm[idx + 1].distance) / windowWidth <= 2 : true) {
                    let myDis = (val.distance - now) / windowWidth;
                    let nextDis = idx != bpm.length - 1 ? (bpm[idx + 1].distance - now) / windowWidth : 1.7;
                    noStroke();
                    fill(info.uiColor);
                    textSize(Abs(0.04));
                    textAlign(LEFT, CENTER);
                    text(`${val.bpm}`, RelX(-0.7 + myDis + 0.009), RelY(0.6 - (val.bpm / maxBpmValue) * 1.6 - 0.05));

                    strokeWeight(Abs(0.004));
                    stroke(info.tertiaryColor);
                    line(RelX(-0.7 + myDis), RelY(0.6 - ((idx == 0 ? val.bpm : bpm[idx - 1].bpm) / maxBpmValue) * 1.6), RelX(-0.7 + myDis), RelY(0.6 - (val.bpm / maxBpmValue) * 1.6));

                    strokeWeight(Abs(0.004));
                    stroke(info.tertiaryColor);
                    line(RelX(-0.7 + myDis), RelY(0.6 - (val.bpm / maxBpmValue) * 1.6), RelX(-0.7 + nextDis), RelY(0.6 - (val.bpm / maxBpmValue) * 1.6));
                }
            })

            let nowBpm = 0;
            for (let i = 0; i < bpm.length; i++) if (varibles.nowBeat >= bpm[i].beat) { nowBpm = bpm[i].bpm; }

            strokeWeight(Abs(0.004));
            stroke(info.tertiaryColor);
            line(RelX(-0.7), RelY(0.6 - (nowBpm / maxBpmValue) * 1.6), RelX(-0.85), RelY(0.6 - (nowBpm / maxBpmValue) * 1.6));

            noStroke();
            fill(info.tertiaryColor);
            textSize(Abs(0.04));
            textAlign(LEFT, CENTER);
            text(`${nowBpm}`, RelX(-0.85), RelY(0.6 - (nowBpm / maxBpmValue) * 1.6 - 0.05));

            strokeWeight(Abs(0.004));
            stroke(info.uiColor);
            line(RelX(-0.7), RelY(-1), RelX(-0.7), RelY(0.6));
            line(RelX(-1), RelY(0.6), RelX(1), RelY(0.6));

            for (let i = 1; i <= Math.floor(maxBpmValue / 50 - 0.1); i++) {
                strokeWeight(Abs(0.002));
                stroke(info.uiColor);
                line(RelX(-0.7), RelY(0.6 - (i * 50 / maxBpmValue) * 1.6), RelX(-0.68), RelY(0.6 - (i * 50 / maxBpmValue) * 1.6));

                noStroke();
                fill(info.uiColor);
                textSize(Abs(0.03));
                textAlign(RIGHT, CENTER);
                text(`${i * 50}`, RelX(-0.71), RelY(0.6 - (i * 50 / maxBpmValue) * 1.6));
            }
        },
        varibles: {
            nowBeat: [
                {
                    startBeat: 0,
                    endBeat: songLength,
                    script: function (progress, nowBeat) {
                        return nowBeat;
                    }
                }
            ]
        }
    },
    {
        name: "text&timeline",
        startBeat: 0,
        endBeat: songLength,
        script: function (varibles) {
            noStroke();
            textSize(Abs(0.07));
            fill(info.textColor);
            textAlign(RIGHT, TOP);
            textFont('Comfortaa');
            text(info.infoName, RelX(0.98), RelY(-0.95));
            textSize(Abs(0.03));
            textAlign(RIGHT, TOP);
            text(info.infoSubName, RelX(0.98), RelY(-0.789));

            strokeWeight(Abs(0.003));
            stroke(info.uiColor);
            let length = varibles.var["tsUp"] / varibles.var["tsDown"]
            let height = 0.8
            line(RelX(-length / 2), RelY(height), RelX(length / 2), RelY(height));
            for (let i = 0; i <= varibles.var["tsUp"]; i++)
                line(RelX(length * i / varibles.var["tsUp"] - length / 2), RelY(height - 0.02), RelX(length * i / varibles.var["tsUp"] - length / 2), RelY(height + 0.02));
            fill(info.backgroundColor);
            circle(varibles["var"].pos.x, varibles["var"].pos.y, varibles["var"].size);

            textFont('Comfortaa');
            noStroke();
            fill(info.secondaryTextColor);
            textSize(Abs(0.07));
            textAlign(RIGHT, CENTER);
            text(`BPM: ${varibles.var["bpm"]}`, RelX(0.6), RelY(-0.625));
            text(`TS: ${varibles.var["tsUp"]}/${varibles.var["tsDown"]}`, RelX(0.98), RelY(-0.625));

            strokeWeight(Abs(0.005));
            stroke(info.uiColor);
            line(RelX(0.4), RelY(-0.53), RelX(0.975), RelY(-0.53));
            strokeWeight(Abs(0.004));
            fill(info.backgroundColor);
            circle(RelX(lerp(0.4, 0.975, varibles.var["nowBeat"] / songLength * 4)), RelY(-0.53), Abs(0.02));

        },
        varibles: {
            var: [{
                startBeat: 0,
                endBeat: songLength,
                script: function (progress, nowBeat) {
                    let nowBpm = 0;
                    for (let i = 0; i < bpm.length; i++) if (nowBeat >= bpm[i].beat) { nowBpm = bpm[i].bpm; }
                    let nowTs = {};
                    for (let i = 0; i < ts.length; i++) if (nowBeat >= ts[i].beat) { nowTs = ts[i] }
                    let length = nowTs.up / nowTs.down
                    return {
                        pos: Rel(((nowBeat - nowTs.beat) / 4 % (nowTs.up / nowTs.down)) - length / 2, 0.8),
                        size: (1 - Easings.OutSine((nowBeat - nowTs.beat) % (4 / nowTs.down) / (4 / nowTs.down))) * Abs(0.005) + Abs(0.03),
                        bpm: nowBpm,
                        tsUp: nowTs.up,
                        tsDown: nowTs.down,
                        nowBeat: nowBeat
                    };
                }
            }]
        }
    }
];


function transcribeBPMFromChart(str) {
    let lines = str.split("\n");
    let ans = [];
    let beat = new Beat([{ beat: 0, bpm: 91 }]);
    lines.forEach((line, val) => {
        line = line.trim().split(",");
        if (parseFloat(line[1]) > 0 && val != 0) {
            let time = parseFloat(line[0]) / 1000;
            let bpm = Math.round(60000 / parseFloat(line[1]) * 1000) / 1000;
            beat.bpmList.push({ beat: parseBeat(beat.fromTime(time)), bpm: bpm });
            beat.preprocessBPM();
        }
    });
    console.log(JSON.stringify(beat.bpmList))
}

function parseBeat(num) {
    let beats = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1, 0.33333333333333, 0.6666666666666, 0.999999999999999]
    let decimal = num % 1
    let whole = Math.floor(num)
    let minDelta = 2
    let minIndex = 0
    beats.forEach((beat, idx) => {
        let delta = Math.abs(beat - decimal)
        if (delta < minDelta) {
            minDelta = delta
            minIndex = idx
        }
    })
    return whole + beats[minIndex]
}

function transcribeTSFromChart(str) {
    let lines = str.split("\n");
    let ans = [];
    lines.forEach(line => {
        line = line.trim().split(" ");
        let num = parseFloat(line[0]);
        if (line[2] == "TS")
            if (line.length == 4) ans.push({ beat: parseInt(line[0]) / 192, up: parseInt(line[3]), down: 4 });
            else ans.push({ beat: parseInt(line[0]) / 192, up: parseInt(line[3]), down: Math.pow(2, parseInt(line[4])) });
    });
    console.log(JSON.stringify(ans))
}

function getAllBeatInformationFromTS(obj) {
    let ans = [];
    let beat = 0;
    while (beat <= songLength) {
        let nowTs = undefined;
        for (let i = 0; i < obj.length; i++) {
            if (beat >= obj[i].beat) continue;
            nowTs = obj[i == 0 ? 0 : i - 1];
            break;
        }
        if (nowTs == undefined) nowTs = obj[obj.length - 1];
        let nowBpm = undefined;
        for (let i = 0; i < bpm.length; i++) {
            if (beat >= bpm[i].beat) continue;
            nowBpm = bpm[i == 0 ? 0 : i - 1];
            break;
        }
        if (nowBpm == undefined) nowBpm = bpm[bpm.length - 1];
        let beatInfo = { realBeat: beat, up: (beat - nowTs.beat) / (4 / nowTs.down) % nowTs.up, down: nowTs.down, distance: getDistance(beat), bpm: nowBpm.bpm, tsUp: nowTs.up };
        ans.push(beatInfo);
        beat += 4 / nowTs.down;
    }
    return ans;
}

function getDistanceFromBPM(obj) {
    let ans = obj;
    ans.forEach(beat => { beat.distance = getDistance(beat.beat) });
    return ans;
}


function getDistance(beat) {
    let ans = 0;
    let speed = 500;
    for (let i = 0; i < bpm.length; i++) {
        if (bpm[i].beat > beat) break;
        if (i == bpm.length - 1) return ans + 60 / bpm[i].bpm * (beat - bpm[i].beat) * speed;
        else if (bpm[i + 1].beat > beat) {
            return ans + 60 / bpm[i].bpm * (beat - bpm[i].beat) * speed;
        }
        else {
            ans += 60 / bpm[i].bpm * (bpm[i + 1].beat - bpm[i].beat) * speed;
        }
    }
    return ans;
}

bpm = [
    { "beat": 0, "bpm": 91, "time": 0 },
    { "beat": 4, "bpm": 91, "time": 2.6373626373626373 },
    { "beat": 32, "bpm": 80, "time": 21.0989010989011 },
    { "beat": 32.6666666666666, "bpm": 74, "time": 21.59890109890105 },
    { "beat": 33.33333333333333, "bpm": 67, "time": 22.13944163944164 },
    { "beat": 34, "bpm": 48, "time": 22.736456564814777 },
    { "beat": 36, "bpm": 33, "time": 25.236456564814777 },
    { "beat": 36.33333333333333, "bpm": 48, "time": 25.842517170875375 },
    { "beat": 36.6666666666666, "bpm": 67, "time": 26.259183837541965 },
    { "beat": 37, "bpm": 89, "time": 26.55769130022859 },
    { "beat": 37.33333333333333, "bpm": 101, "time": 26.782410401352184 },
    { "beat": 37.6666666666666, "bpm": 113, "time": 26.980430203332347 },
    { "beat": 38, "bpm": 130, "time": 27.15742135377486 },
    { "beat": 38.33333333333333, "bpm": 151, "time": 27.311267507621015 },
    { "beat": 38.6666666666666, "bpm": 165, "time": 27.443717838746817 },
    { "beat": 39, "bpm": 184, "time": 27.564929959958963 },
    { "beat": 39.33333333333333, "bpm": 204, "time": 27.673625612132874 },
    { "beat": 39.6666666666666, "bpm": 211, "time": 27.77166482781913 },
    { "beat": 40, "bpm": 225, "time": 27.866451557676967 },
    { "beat": 44, "bpm": 227, "time": 28.933118224343634 },
    { "beat": 48, "bpm": 229, "time": 29.990386946810595 },
    { "beat": 52, "bpm": 231, "time": 31.038421881308413 },
    { "beat": 56, "bpm": 233, "time": 32.07738292026945 },
    { "beat": 60, "bpm": 235, "time": 33.10742583872439 },
    { "beat": 64, "bpm": 237, "time": 34.12870243446907 },
    { "beat": 68, "bpm": 239, "time": 35.14136066231717 },
    { "beat": 72, "bpm": 241, "time": 36.14554476273558 },
    { "beat": 136, "bpm": 242, "time": 52.07915472124181 },
    { "beat": 140, "bpm": 250, "time": 53.07089025843189 },
    { "beat": 144, "bpm": 258, "time": 54.03089025843189 },
    { "beat": 148, "bpm": 266, "time": 54.961122816571425 },
    { "beat": 152, "bpm": 274, "time": 55.86337845566917 },
    { "beat": 156, "bpm": 282, "time": 56.7392908644283 },
    { "beat": 160, "bpm": 290, "time": 57.590354694215534 },
    { "beat": 164, "bpm": 298, "time": 58.41794090111209 },
    { "beat": 168, "bpm": 306, "time": 59.223310028628866 },
    { "beat": 172, "bpm": 314, "time": 60.00762375411906 },
    { "beat": 176, "bpm": 322, "time": 60.77195496431014 },
    { "beat": 180, "bpm": 330, "time": 61.517296579216975 },
    { "beat": 184, "bpm": 338, "time": 62.2445693064897 },
    { "beat": 188, "bpm": 346, "time": 62.954628478087336 },
    { "beat": 192, "bpm": 354, "time": 63.64827009658445 },
    { "beat": 196, "bpm": 362, "time": 64.32623619827936 },
    { "beat": 200, "bpm": 105, "time": 64.98921962369373 },
    { "beat": 214, "bpm": 218, "time": 72.98921962369373 },
    { "beat": 256, "bpm": 175, "time": 84.54885265121666 },
    { "beat": 283, "bpm": 185, "time": 93.80599550835952 },
    { "beat": 307, "bpm": 191, "time": 101.5897792921433 },
    { "beat": 355, "bpm": 199, "time": 116.66831332355692 },
    { "beat": 358, "bpm": 207, "time": 117.57283593662224 },
    { "beat": 361, "bpm": 215, "time": 118.44240115401354 },
    { "beat": 364, "bpm": 223, "time": 119.27961045633911 },
    { "beat": 367, "bpm": 231, "time": 120.08678534423149 },
    { "beat": 370, "bpm": 239, "time": 120.86600612345227 },
    { "beat": 373, "bpm": 247, "time": 121.61914419876608 },
    { "beat": 379, "bpm": 255, "time": 123.07663407730858 },
    { "beat": 403, "bpm": 263, "time": 128.723692900838 },
    { "beat": 427, "bpm": 243, "time": 134.19897807194064 },
    { "beat": 431, "bpm": 249, "time": 135.1866323929283 },
    { "beat": 435, "bpm": 255, "time": 136.15048781461505 },
    { "beat": 439, "bpm": 264, "time": 137.09166428520328 },
    { "beat": 443, "bpm": 273, "time": 137.9723461033851 },
    { "beat": 447, "bpm": 288, "time": 138.85146698250597 },
    { "beat": 451, "bpm": 303, "time": 139.71084198250597 },
    { "beat": 455, "bpm": 318, "time": 140.47816871517924 },
    { "beat": 459, "bpm": 333, "time": 141.2328856963113 },
    { "beat": 463, "bpm": 351, "time": 141.95360641703203 },
    { "beat": 467, "bpm": 369, "time": 142.63736710079272 },
    { "beat": 471, "bpm": 390, "time": 143.28777360485776 },
    { "beat": 475, "bpm": 411, "time": 143.90315822024237 },
    { "beat": 479, "bpm": 441, "time": 144.4870998260818 },
    { "beat": 483, "bpm": 471, "time": 145.0313175131566 },
    { "beat": 487, "bpm": 501, "time": 145.540871653284 },
    { "beat": 491, "bpm": 220, "time": 146.01991356945166 },
    { "beat": 498, "bpm": 200, "time": 147.92900447854257 },
    { "beat": 499, "bpm": 210, "time": 148.22900447854258 },
    { "beat": 500, "bpm": 180, "time": 148.51471876425686 },
    { "beat": 501, "bpm": 190, "time": 148.8480520975902 },
    { "beat": 502, "bpm": 170, "time": 149.16384157127442 },
    { "beat": 503, "bpm": 150, "time": 149.516782747745 },
    { "beat": 504, "bpm": 320, "time": 149.916782747745 },
    { "beat": 506, "bpm": 280, "time": 150.291782747745 },
    { "beat": 508, "bpm": 240, "time": 150.72035417631642 },
    { "beat": 510, "bpm": 260, "time": 151.22035417631642 },
    { "beat": 512, "bpm": 200, "time": 151.68189263785487 },
    { "beat": 514, "bpm": 220, "time": 152.28189263785487 },
    { "beat": 516, "bpm": 180, "time": 152.8273471833094 },
    { "beat": 518, "bpm": 70, "time": 153.49401384997606 },
    { "beat": 521, "bpm": 50, "time": 156.06544242140464 }
]
ts = [{ "beat": 0, "up": 4, "down": 4 }, { "beat": 4, "up": 6, "down": 8 }, { "beat": 40, "up": 4, "down": 4 }, { "beat": 200, "up": 7, "down": 8 }, { "beat": 256, "up": 3, "down": 4 }, { "beat": 491, "up": 7, "down": 4 }, { "beat": 498, "up": 4, "down": 4 }, { "beat": 427, "up": 4, "down": 4 }];
timings = getAllBeatInformationFromTS(ts);
bpm = getDistanceFromBPM(bpm);