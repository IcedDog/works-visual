const VisualConfig = {
    customTextToggle: true,
    customText: "work",
    timeToggle: true,
    timeFormat: "HH:mm:ss",
    infoShow: true,
    debug: true
}

class Visual {
    EventPrototype = {
        startBeat: 0,
        endBeat: 0,
        script: function (progress) { return progress; } // t is progress from 0 to 1
    }
    ObjectPrototype = {
        name: "",
        startBeat: 0,
        endBeat: 0,
        script: function (varibles) { },
        varibles: {}
    }

    script = [];
    beat = new Beat(120);
    info = {
        primaryColor: "#000000",
        secondaryColor: "#FFFFFF",
        tertiaryColor: "#FFFFFF",
        backgroundColor: "#FFFFFF",
        textColor: "#000000",
        infoComposer: "",
        infoName: "",
        infoCreator: ""
    }

    constructor(input, bpm) {
        this.script = input;
        this.beat = new Beat(bpm);
        this.Init();
    }

    Init() {
        // Sort by time
        this.script.sort((a, b) => a.startBeat - b.startBeat);
        for (let i = 0; i < this.script.length; i++) {
            let object = this.script[i];
            for (let [_, value] of Object.entries(object.varibles))
                value.sort((a, b) => a.startBeat - b.startBeat);
        }
    }

    Run(nowTime) {
        let nowBeat = this.beat.fromTime(nowTime);
        for (let i = 0; i < this.script.length; i++) {
            let object = this.script[i];
            if (nowBeat < object.startBeat) continue;
            if (nowBeat > object.endBeat) break;

            let vars = {};
            for (let [key, variable] of Object.entries(object.varibles)) {
                variable.forEach((event) => {
                    if (nowBeat >= event.startBeat) {
                        if (nowBeat > event.endBeat) return;
                        let progress = (nowBeat - event.startBeat) / (event.endBeat - event.startBeat);
                        vars[key] = event.script(progress);
                    }
                });
            }

            object.script(vars);
        }
    }
}

let script = [
    {
        name: "Object1",
        startBeat: 0,
        endBeat: 256,
        script: function (varibles) {
            strokeWeight(AbsX(0.002));
            line(RelX(-0.25), RelY(0.6), RelX(0.25), RelY(0.6));
            for (let i = -2; i <= 2; i++)
                line(RelX(0.125 * i), RelY(0.62), RelX(0.125 * i), RelY(0.58));
            circle(varibles["var"].pos.x, varibles["var"].pos.y, varibles["var"].size);
        },
        varibles: {
            var: [{
                startBeat: 0,
                endBeat: 256,
                script: function (progress) {
                    return {
                        pos: Rel((repeatTimes(progress, 64) - 0.5) / 2, 0.6),
                        size: (1 - Easings.OutSine(repeatTimes(progress, 256))) * AbsX(0.005) + AbsX(0.02)
                    };
                }
            }]
        }
    }
];
let bpm = 128;
let visual = new Visual(script, bpm);
let startTime = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    startTime = millis();
}

function draw() {
    background(200);
    visual.Run((millis() - startTime) / 1000);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}