
info = {
    primaryColor: "#ef614d",
    secondaryColor: "#f79262",
    tertiaryColor: "#689f9c",
    backgroundColor: "#faf8db",
    textColor: "#5d1907",
    secondaryTextColor: "#5d1907",
    uiColor: "#5d1907",
    secondaryUiColor: "#ffffff",
    infoComposer: "かめりあ feat. ななひら",
    infoName: "混乱少女❤️そふらんちゃん!!",
    infoSubName: "(ノリニクシティ・アンリミテッド☆プログレッシヴ・ポリリズミック・ナイトメア・ロングバージョン)",
    infoCreator: "IcedDog"
}

songLength = 1612
maxBpmValue = 500
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
            textStyle(BOLD);
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
            circle(RelX(lerp(0.4, 0.975, varibles.var["nowBeat"] / 526)), RelY(-0.53), Abs(0.02));

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
    lines.forEach(line => {
        line = line.trim().split(" ");
        let num = parseFloat(line[0]);
        if (line[2] == "B") ans.push({ beat: parseInt(line[0]) / 192, bpm: parseInt(line[3]) / 1000 });
    });
    console.log(JSON.stringify(ans))
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

bpm = [{ "beat": 0, "bpm": 80 }, { "beat": 4, "bpm": 256 }, { "beat": 7.5, "bpm": 250 }, { "beat": 11, "bpm": 244 }, { "beat": 14.5, "bpm": 253 }, { "beat": 17, "bpm": 220 }, { "beat": 20.25, "bpm": 250 }, { "beat": 23.75, "bpm": 244 }, { "beat": 27.25, "bpm": 250 }, { "beat": 30.75, "bpm": 256 }, { "beat": 34.75, "bpm": 159 }, { "beat": 42.75, "bpm": 144 }, { "beat": 49.75, "bpm": 135 }, { "beat": 50.75, "bpm": 151 }, { "beat": 55.75, "bpm": 141 }, { "beat": 62.25, "bpm": 131 }, { "beat": 95.5, "bpm": 134 }, { "beat": 96.25, "bpm": 137 }, { "beat": 99.25, "bpm": 140 }, { "beat": 100, "bpm": 143 }, { "beat": 105.75, "bpm": 107.25 }, { "beat": 107.75, "bpm": 143 }, { "beat": 112.5, "bpm": 140 }, { "beat": 116.75, "bpm": 136 }, { "beat": 121.5, "bpm": 132 }, { "beat": 125.75, "bpm": 128 }, { "beat": 130.5, "bpm": 124 }, { "beat": 131.5, "bpm": 127 }, { "beat": 134.5, "bpm": 132 }, { "beat": 134.75, "bpm": 227 }, { "beat": 141.75, "bpm": 232 }, { "beat": 147.75, "bpm": 229 }, { "beat": 154.75, "bpm": 235 }, { "beat": 155.75, "bpm": 216 }, { "beat": 158.25, "bpm": 220 }, { "beat": 162.5, "bpm": 250 }, { "beat": 163.25, "bpm": 230 }, { "beat": 168.25, "bpm": 215 }, { "beat": 175.25, "bpm": 230 }, { "beat": 180.25, "bpm": 195 }, { "beat": 187.75, "bpm": 153 }, { "beat": 203.25, "bpm": 149 }, { "beat": 208, "bpm": 153 }, { "beat": 248.5, "bpm": 115 }, { "beat": 279, "bpm": 167 }, { "beat": 287, "bpm": 163 }, { "beat": 295, "bpm": 159 }, { "beat": 298, "bpm": 115 }, { "beat": 311.5, "bpm": 75 }, { "beat": 312.25, "bpm": 59 }, { "beat": 318.25, "bpm": 45 }, { "beat": 319.25, "bpm": 32 }, { "beat": 320.25, "bpm": 210 }, { "beat": 325.25, "bpm": 215 }, { "beat": 330.25, "bpm": 220 }, { "beat": 335.25, "bpm": 225 }, { "beat": 343.25, "bpm": 199 }, { "beat": 348.25, "bpm": 234 }, { "beat": 353.25, "bpm": 242 }, { "beat": 365.25, "bpm": 256 }, { "beat": 373.25, "bpm": 259 }, { "beat": 440.75, "bpm": 250 }, { "beat": 447.75, "bpm": 244 }, { "beat": 479.25, "bpm": 238 }, { "beat": 480.75, "bpm": 250 }, { "beat": 491.75, "bpm": 259 }, { "beat": 497.25, "bpm": 260 }, { "beat": 502.75, "bpm": 261 }, { "beat": 508.25, "bpm": 262 }, { "beat": 513.75, "bpm": 263 }, { "beat": 519.25, "bpm": 264 }, { "beat": 524.75, "bpm": 265 }, { "beat": 530.25, "bpm": 266 }, { "beat": 535.75, "bpm": 267 }, { "beat": 547.75, "bpm": 250 }, { "beat": 550.75, "bpm": 225 }, { "beat": 553, "bpm": 238 }, { "beat": 553.75, "bpm": 204 }, { "beat": 609.25, "bpm": 176 }, { "beat": 621.25, "bpm": 175 }, { "beat": 626.25, "bpm": 301 }, { "beat": 635.25, "bpm": 300 }, { "beat": 642.25, "bpm": 307 }, { "beat": 648.25, "bpm": 320 }, { "beat": 654.25, "bpm": 330 }, { "beat": 660.25, "bpm": 350 }, { "beat": 663.25, "bpm": 120 }, { "beat": 671.25, "bpm": 330 }, { "beat": 675.25, "bpm": 335 }, { "beat": 679.25, "bpm": 340 }, { "beat": 683.25, "bpm": 345 }, { "beat": 687.25, "bpm": 350 }, { "beat": 691.25, "bpm": 360 }, { "beat": 692.25, "bpm": 370 }, { "beat": 693.25, "bpm": 380 }, { "beat": 694.25, "bpm": 390 }, { "beat": 695.25, "bpm": 400 }, { "beat": 696.25, "bpm": 410 }, { "beat": 697.25, "bpm": 380 }, { "beat": 699.25, "bpm": 133 }, { "beat": 707.25, "bpm": 375 }, { "beat": 711.25, "bpm": 360 }, { "beat": 715.25, "bpm": 375 }, { "beat": 719.25, "bpm": 390 }, { "beat": 723.25, "bpm": 420 }, { "beat": 727.25, "bpm": 405 }, { "beat": 729.25, "bpm": 420 }, { "beat": 731.25, "bpm": 450 }, { "beat": 733.25, "bpm": 398 }, { "beat": 735.25, "bpm": 137 }, { "beat": 750.75, "bpm": 118 }, { "beat": 751.25, "bpm": 29.5 }, { "beat": 752.25, "bpm": 59 }, { "beat": 766.25, "bpm": 45 }, { "beat": 767.25, "bpm": 10 }, { "beat": 768.25, "bpm": 153 }, { "beat": 793.25, "bpm": 115.2 }, { "beat": 803.5, "bpm": 153 }, { "beat": 852.75, "bpm": 115 }, { "beat": 886, "bpm": 167 }, { "beat": 894, "bpm": 163 }, { "beat": 902, "bpm": 159 }, { "beat": 905, "bpm": 115 }, { "beat": 930, "bpm": 59 }, { "beat": 936, "bpm": 45 }, { "beat": 937, "bpm": 32 }, { "beat": 938, "bpm": 205 }, { "beat": 944.5, "bpm": 207 }, { "beat": 951.5, "bpm": 211 }, { "beat": 963, "bpm": 215 }, { "beat": 971, "bpm": 220 }, { "beat": 974.5, "bpm": 225 }, { "beat": 978, "bpm": 175 }, { "beat": 980, "bpm": 18.075 }, { "beat": 981, "bpm": 220 }, { "beat": 983, "bpm": 225 }, { "beat": 986, "bpm": 199 }, { "beat": 991, "bpm": 234 }, { "beat": 996, "bpm": 242 }, { "beat": 1008, "bpm": 256 }, { "beat": 1015, "bpm": 266 }, { "beat": 1016, "bpm": 259 }, { "beat": 1083.5, "bpm": 250 }, { "beat": 1092, "bpm": 241 }, { "beat": 1105, "bpm": 195 }, { "beat": 1133.5, "bpm": 200 }, { "beat": 1138.5, "bpm": 205 }, { "beat": 1143, "bpm": 214 }, { "beat": 1148, "bpm": 209 }, { "beat": 1152.5, "bpm": 214 }, { "beat": 1157.5, "bpm": 209 }, { "beat": 1162, "bpm": 214 }, { "beat": 1166, "bpm": 219 }, { "beat": 1167, "bpm": 209 }, { "beat": 1184.5, "bpm": 206 }, { "beat": 1187.5, "bpm": 203 }, { "beat": 1190.5, "bpm": 200 }, { "beat": 1193.5, "bpm": 197 }, { "beat": 1199.5, "bpm": 183 }, { "beat": 1204.5, "bpm": 132 }, { "beat": 1234.5, "bpm": 140 }, { "beat": 1241.25, "bpm": 150 }, { "beat": 1245, "bpm": 140 }, { "beat": 1248.25, "bpm": 143 }, { "beat": 1251.5, "bpm": 134 }, { "beat": 1257, "bpm": 263 }, { "beat": 1268, "bpm": 272 }, { "beat": 1324, "bpm": 260 }, { "beat": 1327, "bpm": 234 }, { "beat": 1329, "bpm": 239 }, { "beat": 1330, "bpm": 216 }, { "beat": 1385.5, "bpm": 176 }, { "beat": 1397.5, "bpm": 161 }, { "beat": 1413, "bpm": 157 }, { "beat": 1413.5, "bpm": 178 }, { "beat": 1439.5, "bpm": 199 }, { "beat": 1441.5, "bpm": 215 }, { "beat": 1448, "bpm": 220 }, { "beat": 1453, "bpm": 210 }, { "beat": 1458.5, "bpm": 220 }, { "beat": 1463.5, "bpm": 230 }, { "beat": 1466.5, "bpm": 190 }, { "beat": 1468.5, "bpm": 196 }, { "beat": 1469.5, "bpm": 220 }, { "beat": 1471.5, "bpm": 230 }, { "beat": 1473.5, "bpm": 240 }, { "beat": 1475.5, "bpm": 250 }, { "beat": 1476.75, "bpm": 246 }, { "beat": 1477.5, "bpm": 255 }, { "beat": 1479.5, "bpm": 260 }, { "beat": 1481.5, "bpm": 256 }, { "beat": 1488.75, "bpm": 277 }, { "beat": 1489.5, "bpm": 259 }, { "beat": 1570.5, "bpm": 240 }, { "beat": 1572, "bpm": 176 }, { "beat": 1573, "bpm": 159 }, { "beat": 1590.25, "bpm": 149 }, { "beat": 1595, "bpm": 156 }, { "beat": 1599, "bpm": 153 }, { "beat": 1601.5, "bpm": 144 }, { "beat": 1602.5, "bpm": 78 }, { "beat": 1606, "bpm": 78 }];

ts = [{ "beat": 0, "up": 1, "down": 1 }, { "beat": 4, "up": 7, "down": 8 }, { "beat": 14.5, "up": 5, "down": 8 }, { "beat": 17, "up": 13, "down": 16 }, { "beat": 20.25, "up": 7, "down": 8 }, { "beat": 30.75, "up": 4, "down": 4 }, { "beat": 50.75, "up": 11, "down": 16 }, { "beat": 53.5, "up": 9, "down": 16 }, { "beat": 55.75, "up": 11, "down": 16 }, { "beat": 58.5, "up": 9, "down": 16 }, { "beat": 60.75, "up": 3, "down": 8 }, { "beat": 62.25, "up": 11, "down": 16 }, { "beat": 65, "up": 9, "down": 16 }, { "beat": 67.25, "up": 11, "down": 16 }, { "beat": 70, "up": 9, "down": 16 }, { "beat": 72.25, "up": 3, "down": 8 }, { "beat": 73.75, "up": 11, "down": 16 }, { "beat": 76.5, "up": 9, "down": 16 }, { "beat": 78.75, "up": 11, "down": 16 }, { "beat": 81.5, "up": 9, "down": 16 }, { "beat": 83.75, "up": 3, "down": 8 }, { "beat": 85.25, "up": 11, "down": 16 }, { "beat": 88, "up": 9, "down": 16 }, { "beat": 90.25, "up": 11, "down": 16 }, { "beat": 93, "up": 7, "down": 16 }, { "beat": 94.75, "up": 3, "down": 16 }, { "beat": 96.25, "up": 9, "down": 16 }, { "beat": 98.5, "up": 3, "down": 16 }, { "beat": 100, "up": 5, "down": 16 }, { "beat": 101.25, "up": 9, "down": 8 }, { "beat": 105.75, "up": 8, "down": 16 }, { "beat": 107.75, "up": 19, "down": 16 }, { "beat": 112.5, "up": 17, "down": 16 }, { "beat": 116.75, "up": 19, "down": 16 }, { "beat": 121.5, "up": 17, "down": 16 }, { "beat": 125.75, "up": 19, "down": 16 }, { "beat": 130.5, "up": 1, "down": 4 }, { "beat": 131.5, "up": 3, "down": 8 }, { "beat": 133, "up": 7, "down": 16 }, { "beat": 134.75, "up": 7, "down": 4 }, { "beat": 141.75, "up": 6, "down": 4 }, { "beat": 147.75, "up": 4, "down": 4 }, { "beat": 155.75, "up": 5, "down": 8 }, { "beat": 158.25, "up": 5, "down": 4 }, { "beat": 163.25, "up": 5, "down": 8 }, { "beat": 168.25, "up": 7, "down": 8 }, { "beat": 175.25, "up": 5, "down": 8 }, { "beat": 187.75, "up": 9, "down": 16 }, { "beat": 194.5, "up": 7, "down": 16 }, { "beat": 196.25, "up": 9, "down": 16 }, { "beat": 200.75, "up": 5, "down": 8 }, { "beat": 203.25, "up": 19, "down": 16 }, { "beat": 208, "up": 2, "down": 4 }, { "beat": 212, "up": 9, "down": 16 }, { "beat": 214.25, "up": 3, "down": 4 }, { "beat": 217.25, "up": 9, "down": 16 }, { "beat": 219.5, "up": 3, "down": 4 }, { "beat": 222.5, "up": 7, "down": 16 }, { "beat": 224.25, "up": 9, "down": 16 }, { "beat": 226.5, "up": 3, "down": 4 }, { "beat": 229.5, "up": 9, "down": 16 }, { "beat": 231.75, "up": 3, "down": 4 }, { "beat": 234.75, "up": 7, "down": 8 }, { "beat": 238.25, "up": 19, "down": 16 }, { "beat": 243, "up": 7, "down": 8 }, { "beat": 246.5, "up": 2, "down": 4 }, { "beat": 248.5, "up": 3, "down": 4 }, { "beat": 254.5, "up": 4, "down": 4 }, { "beat": 258.5, "up": 3, "down": 4 }, { "beat": 261.5, "up": 4, "down": 4 }, { "beat": 265.5, "up": 3, "down": 4 }, { "beat": 268.5, "up": 4, "down": 4 }, { "beat": 272.5, "up": 7, "down": 16 }, { "beat": 276, "up": 3, "down": 4 }, { "beat": 279, "up": 4, "down": 4 }, { "beat": 295, "up": 3, "down": 8 }, { "beat": 298, "up": 7, "down": 16 }, { "beat": 301.5, "up": 15, "down": 16 }, { "beat": 305.25, "up": 7, "down": 16 }, { "beat": 308.75, "up": 11, "down": 16 }, { "beat": 311.5, "up": 3, "down": 16 }, { "beat": 312.25, "up": 1, "down": 4 }, { "beat": 320.25, "up": 5, "down": 4 }, { "beat": 340.25, "up": 3, "down": 8 }, { "beat": 343.25, "up": 5, "down": 8 }, { "beat": 348.25, "up": 5, "down": 4 }, { "beat": 353.25, "up": 3, "down": 4 }, { "beat": 365.25, "up": 4, "down": 4 }, { "beat": 433.25, "up": 5, "down": 8 }, { "beat": 440.75, "up": 7, "down": 4 }, { "beat": 447.75, "up": 4, "down": 4 }, { "beat": 451.75, "up": 9, "down": 8 }, { "beat": 456.25, "up": 4, "down": 4 }, { "beat": 460.25, "up": 11, "down": 8 }, { "beat": 465.75, "up": 4, "down": 4 }, { "beat": 469.75, "up": 9, "down": 8 }, { "beat": 474.25, "up": 5, "down": 4 }, { "beat": 479.25, "up": 3, "down": 8 }, { "beat": 480.75, "up": 3, "down": 4 }, { "beat": 486.75, "up": 2, "down": 4 }, { "beat": 488.75, "up": 3, "down": 8 }, { "beat": 491.75, "up": 11, "down": 8 }, { "beat": 535.75, "up": 6, "down": 4 }, { "beat": 547.75, "up": 3, "down": 4 }, { "beat": 553.75, "up": 7, "down": 4 }, { "beat": 581.75, "up": 3, "down": 4 }, { "beat": 587.75, "up": 7, "down": 4 }, { "beat": 594.75, "up": 3, "down": 4 }, { "beat": 600.75, "up": 4, "down": 4 }, { "beat": 604.75, "up": 9, "down": 8 }, { "beat": 609.25, "up": 3, "down": 4 }, { "beat": 621.25, "up": 5, "down": 4 }, { "beat": 626.25, "up": 9, "down": 4 }, { "beat": 635.25, "up": 7, "down": 4 }, { "beat": 642.25, "up": 6, "down": 4 }, { "beat": 660.25, "up": 3, "down": 4 }, { "beat": 663.25, "up": 4, "down": 4 }, { "beat": 691.25, "up": 1, "down": 4 }, { "beat": 697.25, "up": 2, "down": 4 }, { "beat": 699.25, "up": 4, "down": 4 }, { "beat": 707.25, "up": 2, "down": 4 }, { "beat": 711.25, "up": 4, "down": 4 }, { "beat": 727.25, "up": 2, "down": 4 }, { "beat": 735.25, "up": 4, "down": 4 }, { "beat": 751.25, "up": 1, "down": 4 }, { "beat": 768.25, "up": 17, "down": 16 }, { "beat": 772.5, "up": 4, "down": 4 }, { "beat": 776.5, "up": 15, "down": 16 }, { "beat": 780.25, "up": 9, "down": 16 }, { "beat": 787, "up": 7, "down": 16 }, { "beat": 788.75, "up": 9, "down": 16 }, { "beat": 793.25, "up": 7, "down": 16 }, { "beat": 800.25, "up": 13, "down": 16 }, { "beat": 803.5, "up": 3, "down": 4 }, { "beat": 806.5, "up": 2, "down": 4 }, { "beat": 810.5, "up": 9, "down": 16 }, { "beat": 812.75, "up": 3, "down": 4 }, { "beat": 815.75, "up": 9, "down": 16 }, { "beat": 818, "up": 3, "down": 4 }, { "beat": 821, "up": 7, "down": 16 }, { "beat": 822.75, "up": 9, "down": 16 }, { "beat": 825, "up": 3, "down": 4 }, { "beat": 828, "up": 9, "down": 16 }, { "beat": 830.25, "up": 3, "down": 4 }, { "beat": 833.25, "up": 1, "down": 8 }, { "beat": 833.75, "up": 13, "down": 16 }, { "beat": 837, "up": 11, "down": 16 }, { "beat": 839.75, "up": 3, "down": 4 }, { "beat": 845.75, "up": 3, "down": 8 }, { "beat": 847.25, "up": 7, "down": 8 }, { "beat": 850.75, "up": 2, "down": 4 }, { "beat": 852.75, "up": 3, "down": 4 }, { "beat": 855.75, "up": 11, "down": 16 }, { "beat": 858.5, "up": 3, "down": 4 }, { "beat": 861.5, "up": 4, "down": 4 }, { "beat": 865.5, "up": 3, "down": 4 }, { "beat": 868.5, "up": 4, "down": 4 }, { "beat": 872.5, "up": 3, "down": 4 }, { "beat": 875.5, "up": 4, "down": 4 }, { "beat": 879.5, "up": 7, "down": 16 }, { "beat": 883, "up": 3, "down": 4 }, { "beat": 886, "up": 4, "down": 4 }, { "beat": 902, "up": 3, "down": 8 }, { "beat": 905, "up": 6, "down": 4 }, { "beat": 911, "up": 11, "down": 8 }, { "beat": 916.5, "up": 6, "down": 4 }, { "beat": 922.5, "up": 11, "down": 8 }, { "beat": 928, "up": 2, "down": 4 }, { "beat": 930, "up": 1, "down": 4 }, { "beat": 938, "up": 13, "down": 8 }, { "beat": 944.5, "up": 7, "down": 4 }, { "beat": 951.5, "up": 13, "down": 8 }, { "beat": 958, "up": 5, "down": 4 }, { "beat": 963, "up": 3, "down": 4 }, { "beat": 966, "up": 5, "down": 4 }, { "beat": 971, "up": 7, "down": 8 }, { "beat": 978, "up": 2, "down": 4 }, { "beat": 980, "up": 1, "down": 4 }, { "beat": 981, "up": 2, "down": 4 }, { "beat": 983, "up": 3, "down": 8 }, { "beat": 986, "up": 5, "down": 8 }, { "beat": 991, "up": 5, "down": 4 }, { "beat": 996, "up": 3, "down": 4 }, { "beat": 1008, "up": 4, "down": 4 }, { "beat": 1076, "up": 5, "down": 8 }, { "beat": 1088.5, "up": 7, "down": 8 }, { "beat": 1092, "up": 5, "down": 8 }, { "beat": 1097, "up": 4, "down": 4 }, { "beat": 1105, "up": 5, "down": 4 }, { "beat": 1110, "up": 9, "down": 8 }, { "beat": 1114.5, "up": 5, "down": 4 }, { "beat": 1119.5, "up": 9, "down": 8 }, { "beat": 1124, "up": 5, "down": 4 }, { "beat": 1129, "up": 9, "down": 8 }, { "beat": 1133.5, "up": 5, "down": 4 }, { "beat": 1138.5, "up": 9, "down": 8 }, { "beat": 1143, "up": 5, "down": 4 }, { "beat": 1148, "up": 9, "down": 8 }, { "beat": 1152.5, "up": 5, "down": 4 }, { "beat": 1157.5, "up": 9, "down": 8 }, { "beat": 1162, "up": 5, "down": 4 }, { "beat": 1167, "up": 9, "down": 8 }, { "beat": 1171.5, "up": 5, "down": 4 }, { "beat": 1181.5, "up": 3, "down": 4 }, { "beat": 1202.5, "up": 2, "down": 4 }, { "beat": 1204.5, "up": 1, "down": 4 }, { "beat": 1205.5, "up": 7, "down": 8 }, { "beat": 1216, "up": 4, "down": 4 }, { "beat": 1220, "up": 7, "down": 8 }, { "beat": 1230.5, "up": 4, "down": 4 }, { "beat": 1234.5, "up": 13, "down": 16 }, { "beat": 1237.75, "up": 7, "down": 8 }, { "beat": 1241.25, "up": 15, "down": 16 }, { "beat": 1245, "up": 13, "down": 16 }, { "beat": 1251.5, "up": 11, "down": 16 }, { "beat": 1257, "up": 11, "down": 8 }, { "beat": 1312, "up": 6, "down": 4 }, { "beat": 1324, "up": 3, "down": 4 }, { "beat": 1330, "up": 7, "down": 4 }, { "beat": 1358, "up": 3, "down": 4 }, { "beat": 1364, "up": 7, "down": 4 }, { "beat": 1371, "up": 3, "down": 4 }, { "beat": 1377, "up": 4, "down": 4 }, { "beat": 1381, "up": 9, "down": 8 }, { "beat": 1385.5, "up": 3, "down": 4 }, { "beat": 1397.5, "up": 4, "down": 4 }, { "beat": 1437.5, "up": 2, "down": 4 }, { "beat": 1441.5, "up": 7, "down": 8 }, { "beat": 1445, "up": 3, "down": 4 }, { "beat": 1448, "up": 5, "down": 8 }, { "beat": 1455.5, "up": 3, "down": 4 }, { "beat": 1458.5, "up": 5, "down": 8 }, { "beat": 1463.5, "up": 3, "down": 4 }, { "beat": 1469.5, "up": 2, "down": 4 }, { "beat": 1481.5, "up": 4, "down": 4 }, { "beat": 1549.5, "up": 5, "down": 8 }, { "beat": 1557, "up": 5, "down": 4 }, { "beat": 1562, "up": 7, "down": 8 }, { "beat": 1565.5, "up": 5, "down": 4 }, { "beat": 1570.5, "up": 3, "down": 8 }, { "beat": 1572, "up": 1, "down": 4 }, { "beat": 1573, "up": 7, "down": 16 }, { "beat": 1574.75, "up": 9, "down": 16 }, { "beat": 1581.5, "up": 7, "down": 16 }, { "beat": 1583.25, "up": 9, "down": 16 }, { "beat": 1587.75, "up": 5, "down": 8 }, { "beat": 1590.25, "up": 19, "down": 16 }, { "beat": 1595, "up": 2, "down": 4 }, { "beat": 1599, "up": 5, "down": 8 }, { "beat": 1601.5, "up": 1, "down": 4 }, { "beat": 1602.5, "up": 7, "down": 8 }, { "beat": 1606, "up": 4, "down": 4 }];

timings = getAllBeatInformationFromTS(ts);
//timings[timings.length - 1] = { "realBeat": 1606, "up": 0, "down": 8, "distance": timings[timings.length - 2].distance, "bpm": 78, "tsUp": 7 };
bpm = getDistanceFromBPM(bpm);