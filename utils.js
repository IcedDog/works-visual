class Beat {
    bpmList = [{ beat: 0, bpm: 120 }];
    offset = 0; // in seconds
    preprocessBPM() {
        this.bpmList.forEach((item, index) => {
            if (index == 0) item.time = 0;
            else item.time = this.bpmList[index - 1].time + 60 / this.bpmList[index - 1].bpm * (item.beat - this.bpmList[index - 1].beat);
        });
    }
    constructor(bpm, offset = 0) {
        if (Array.isArray(bpm)) this.bpmList = bpm;
        else this.bpmList = [{ beat: 0, bpm: bpm }];
        this.offset = offset;
        this.bpmList.sort((a, b) => a.beat - b.beat);
        this.preprocessBPM();
    }
    fromTime(time) {
        if (time < 0) return 0;
        let index = 0;
        for (index = 0; index < this.bpmList.length && time >= this.bpmList[index].time; index++);
        return this.bpmList[index - 1].beat + (time - this.offset - this.bpmList[index - 1].time) / 60 * this.bpmList[index - 1].bpm;
    }
    toTime(beat) {
        if (beat < 0) return 0;
        let index = 0;
        for (index = 0; beat >= bpmList[index].beat; index++);
        return bpmList[index - 1].time + (beat - bpmList[index - 1].beat) * 60 / bpmList[index - 1].bpm + this.offset;
    }
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
        secondaryColor: "#ffffff",
        tertiaryColor: "#ffffff",
        backgroundColor: "#ffffff",
        textColor: "#000000",
        secondaryTextColor: "#000000",
        uiColor: "#ffffff",
        secondaryUiColor: "#ffffff",
        infoComposer: "",
        infoName: "",
        infoSubName: "",
        infoCreator: ""
    }

    constructor(input, bpm, info) {
        this.script = input;
        this.beat = new Beat(bpm);
        this.info = info;
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
                        vars[key] = event.script(progress, nowBeat);
                    }
                });
            }

            object.script(vars);
        }
    }
}

const Easings = {
    Linear: function (t) { return t; },
    InQuad: function (t) { return t * t; },
    OutQuad: function (t) { return t * (2 - t); },
    InOutQuad: function (t) {
        if ((t *= 2) < 1) {
            return 0.5 * t * t;
        }
        return -0.5 * (--t * (t - 2) - 1);
    },
    InCubic: function (t) { return t * t * t; },
    OutCubic: function (t) { return --t * t * t + 1; },
    InOutCubic: function (t) {
        if ((t *= 2) < 1) {
            return .5 * t * t * t;
        }
        return .5 * ((t -= 2) * t * t + 2);
    },
    InQuart: function (t) { return t * t * t * t; },
    OutQuart: function (t) { return 1 - (--t * t * t * t); },
    InOutQuart: function (t) {
        if ((t *= 2) < 1) {
            return .5 * t * t * t * t;
        }
        return .5 * ((t -= 2) * t * t * t - 2);
    },
    InQuint: function (t) { return t * t * t * t * t; },
    OutQuint: function (t) { return --t * t * t * t * t + 1; },
    InOutQuint: function (t) {
        if ((t *= 2) < 1)
            return 0.5 * t * t * t * t * t;
        return 0.5 * ((t -= 2) * t * t * t * t + 2);
    },
    InSine: function (t) { return 1 - Math.cos(t * Math.PI / 2); },
    OutSine: function (t) { return Math.sin(t * Math.PI / 2); },
    InOutSine: function (t) { return 0.5 * (1 - Math.cos(Math.PI * t)); },
    InBounce: function (t) { return 1 - outBounce(1 - t); },
    OutBounce: function (t) {
        if (t < 0.36363636363636365) {
            return 7.5625 * t * t;
        } else if (t < 0.7272727272727273) {
            t = t - 0.5454545454545454;
            return 7.5625 * t * t + 0.75;
        } else if (t < 0.9090909090909091) {
            t = t - 0.8181818181818182;
            return 7.5625 * t * t + 0.9375;
        } else {
            t = t - 0.9545454545454546;
            return 7.5625 * t * t + 0.984375;
        }
    },
    InOutBounce: function (t) {
        if (t < 0.5) {
            return Easings.InBounce(t * 2) * 0.5;
        }
        return Easings.OutBounce(t * 2 - 1) * 0.5 + 1 * 0.5;
    },
    InElastic: function (t, amplitude, period) {
        if (typeof period == 'undefined') {
            period = 0;
        }
        if (typeof amplitude == 'undefined') {
            amplitude = 1;
        }
        var offset = 1.70158;

        if (t == 0) return 0;
        if (t == 1) return 1;

        if (!period) {
            period = .3;
        }

        if (amplitude < 1) {
            amplitude = 1;
            offset = period / 4;
        } else {
            offset = period / (2 * Math.PI) * Math.asin(1 / amplitude);
        }

        return -(amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - offset) * (Math.PI * 2) / period));
    },
    OutElastic: function (t, amplitude, period) {
        if (typeof period == 'undefined') {
            period = 0;
        }
        if (typeof amplitude == 'undefined') {
            amplitude = 1;
        }
        var offset = 1.70158;

        if (t == 0) return 0;
        if (t == 1) return 1;

        if (!period) {
            period = .3;
        }

        if (amplitude < 1) {
            amplitude = 1;
            offset = period / 4;
        } else {
            offset = period / (2 * Math.PI) * Math.asin(1 / amplitude);
        }

        return amplitude * Math.pow(2, -10 * t) * Math.sin((t - offset) * (Math.PI * 2) / period) + 1;
    },
    InOutElastic: function (t, amplitude, period) {
        var offset;
        t = (t / 2) - 1;
        // escape early for 0 and 1
        if (t === 0 || t === 1) {
            return t;
        }
        if (!period) {
            period = 0.44999999999999996;
        }
        if (!amplitude) {
            amplitude = 1;
            offset = period / 4;
        } else {
            offset = period / (Math.PI * 2.0) * Math.asin(1 / amplitude);
        }
        return (amplitude * Math.pow(2, 10 * t) * Math.sin((t - offset) * (Math.PI * 2) / period)) / -2;
    },
    InExpo: function (t) {
        return Math.pow(2, 10 * (t - 1));
    },
    OutExpo: function (t) {
        return -Math.pow(2, -10 * t) + 1;
    },
    InOutExpo: function (t) {
        if (t == 0) return 0;
        if (t == 1) return 1;
        if ((t /= .5) < 1) return .5 * Math.pow(2, 10 * (t - 1));
        return .5 * (-Math.pow(2, -10 * --t) + 2);
    },
    InCirc: function (t) {
        return -1 * (Math.sqrt(1 - t * t) - 1);
    },
    OutCirc: function (t) {
        t = t - 1;
        return Math.sqrt(1 - t * t);
    },
    InOutCirc: function (t) {
        var c = 1;
        if ((t /= .5) < 1) return -.5 * (Math.sqrt(1 - t * t) - 1);
        return .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    },
    InBack: function (t, overshoot) {
        if (!overshoot && overshoot !== 0) {
            overshoot = 1.70158;
        }
        return 1 * t * t * ((overshoot + 1) * t - overshoot);
    },
    OutBack: function (t, overshoot) {
        if (!overshoot && overshoot !== 0) {
            overshoot = 1.70158;
        }
        t = t - 1;
        return t * t * ((overshoot + 1) * t + overshoot) + 1;
    },
    InOutBack: function (t, overshoot) {
        if (overshoot == undefined) overshoot = 1.70158;
        if ((t /= .5) < 1) return .5 * (t * t * (((overshoot *= (1.525)) + 1) * t - overshoot));
        return .5 * ((t -= 2) * t * (((overshoot *= (1.525)) + 1) * t + overshoot) + 2);
    }
};

function repeatTimes(progress, times) {
    return progress * times % 1;
}

function Rel(x, y) {
    return { x: x * windowWidth / 2 + windowWidth / 2, y: y * windowHeight / 2 + windowHeight / 2 };
}

function RelX(x) {
    return x * windowWidth / 2 + windowWidth / 2
}

function RelY(y) {
    return y * windowHeight / 2 + windowHeight / 2
}

function Abs(val) {
    return val * Math.min(windowWidth, windowHeight);
}

function log(message, name = "Main") {
    console.log(`[${name}] ${message}`);
}

function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}