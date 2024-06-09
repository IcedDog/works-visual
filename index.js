const VisualConfig = {
    customTextToggle: true,
    customText: "work",
    timeToggle: true,
    timeFormat: "HH:mm:ss",
    infoShow: true,
    debug: true
}

let script = [
    {
        name: "Object1",
        startBeat: 0,
        endBeat: 256,
        script: function (varibles) {
            strokeWeight(Abs(0.002));
            line(RelX(-0.25), RelY(0.6), RelX(0.25), RelY(0.6));
            for (let i = -2; i <= 2; i++)
                line(RelX(0.125 * i), RelY(0.62), RelX(0.125 * i), RelY(0.58));
            circle(varibles["var"].pos.x, varibles["var"].pos.y, varibles["var"].size);
        },
        varibles: {
            var: [{
                startBeat: 0,
                endBeat: 256,
                script: function (progress, nowBeat) {
                    return {
                        pos: Rel((repeatTimes(progress, 64) - 0.5) / 2, 0.6),
                        size: (1 - Easings.OutSine(repeatTimes(progress, 256))) * Abs(0.005) + Abs(0.02)
                    };
                }
            }]
        }
    }
];
let bpm = 128;
let info = {
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
let visual = new Visual(script, bpm, info);
let startTime = 0;
let list = {};
let soundList = {};
let scriptList = {};
let index = 0;
let nextIndex = 0;
let hasPressed = false;
let isPaused = false;
let pauseTime = 0;

function generateNextIndex() {
    nextIndex = (nextIndex + 1) % list.extra.length;
}

function loadInit() {
    fetch('./list.json').then((response) => response.json()).then((json) => list = json).then(() => loadFirst());
}

function loadFirst() {
    fetch(list.extra[index].script).then((response) => response.text()).then((text) => scriptList.now = text).then(() => {
        soundList.now = loadSound(list.extra[index].music, () => {
            if (VisualConfig.debug) log("Loaded: " + list.extra[index].script + " " + list.extra[index].music);
        });
    });
}

async function load() {
    generateNextIndex();
    fetch(list.extra[nextIndex].script).then((response) => response.text()).then((text) => scriptList.next = text).then(() => {
        soundList.next = loadSound(list.extra[nextIndex].music, () => {
            if (VisualConfig.debug) log("Loaded next: " + list.extra[nextIndex].script + " " + list.extra[nextIndex].music);
        });
    });
}

function onMousePressed() {
    if (hasPressed) return;
    hasPressed = true;
    Function(scriptList.now)();
    visual = new Visual(script, bpm);
    startTime = millis();
    soundList.now.play();
    load();
}

function preload() {
    soundFormats('mp3', 'ogg');
    loadInit();
}

function setup() {
    createCanvas(windowWidth, windowHeight).mousePressed(onMousePressed);
    frameRate(60);
}

function draw() {
    background(200);
    if (!hasPressed) {
        textSize(32);
        textAlign(CENTER, CENTER);
        text("Click to start", RelX(0), RelY(0));
    }
    if (isPaused) {
        startTime = millis() - pauseTime;
    }
    if ((millis() - startTime) / 1000 > soundList.now.duration() + 1) {
        soundList.now.stop();
        scriptList.now = scriptList.next;
        soundList.now = soundList.next;
        Function(scriptList.now)();
        visual = new Visual(script, bpm);
        startTime = millis();
        soundList.now.play();
        load();
    }
    visual.Run((millis() - startTime) / 1000);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        if ((millis() - startTime - 5000) / 1000 <= 0) {
            startTime = millis();
            soundList.now.jump(0);
            if (isPaused) pauseTime = 0;
        }
        else {
            startTime += 5000;
            if (isPaused) pauseTime -= 5000;
            soundList.now.jump((millis() - startTime) / 1000);
        }
    }
    if (keyCode === RIGHT_ARROW) {
        if ((millis() - startTime + 5000) / 1000 >= soundList.now.duration()) {
            startTime = 0;
            soundList.now.jump(soundList.now.duration());
            if (isPaused) pauseTime = soundList.now.duration() * 10000;
        }
        else {
            startTime -= 5000;
            if (isPaused) pauseTime += 5000;
            soundList.now.jump((millis() - startTime) / 1000);
        }
    }
    if (key === ' ') {
        if (isPaused) {
            soundList.now.play();
            isPaused = false;
            startTime = millis() - pauseTime;
        } else {
            soundList.now.pause();
            isPaused = true;
            pauseTime = millis() - startTime;
        }
        return false;
    }
}