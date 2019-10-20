// const Zdog = require('zdog');
const TAU = Zdog.TAU;
const globalDebug = false;
let knucks = [];
function newIllustration(className) {
    console.log(className);
    const SkinColor = getSkinColor();
    let illo = new Zdog.Illustration({
        element: className,
        // zoom up 4x
        zoom: 10,
        dragRotate: true,
        // stop rotation when dragging starts
        onDragStart: function() {

        },
        onDragEnd: function() {

        },
    });
    illo.isSpinning = false;
    // leftvsright
    // paw
    let handBack = new Zdog.Shape({
        addTo: illo,
        fill: true,
        color: SkinColor,
        translate: {
            y: 3.5
        },
        rotate: {
            y: TAU/2
        },
        path: [
            { x: 0, y: 0, z: 0 },
            { x: 2, y: 0, z: 0 },
            { x: 3, y: -3, z: 0 }, // pinkey
            { x: 1, y: -3.5, z: 0 }, // ring
            { x: 0, y: -4, z: 0 }, // middle
            { x: -1, y: -4, z: 0 }, // pointer
            { x: -1, y: -1, z: 0 } // thumb
        ],
        stroke: 2
    });
    // console.log(handBack);
    // handback.path[5] - pointer root
    // handback.path[4] - middle root
    // handback.path[3] - ring root
    // handback.path[2] - pinkey root
    addFinger('pointer', handBack);
    addFinger('middle', handBack);
    addFinger('ring', handBack);
    addFinger('pinkey', handBack);
    addFinger('thumb', handBack);

    // fingers
    // thumb
    // segments
    addDebugAxes(illo);
    const rotateRateX = ((getRandomInt(10) - getRandomInt(10)) / 100);
    const rotateRateY = ((getRandomInt(10) - getRandomInt(10)) / 100);
    const rotateRateZ = ((getRandomInt(10) - getRandomInt(10)) / 100);
    function animate() {
        // rotate illo each frame
        if (illo.isSpinning) {
            illo.rotate.x += rotateRateX;
            illo.rotate.y += rotateRateY;
            illo.rotate.z += rotateRateZ;
        }
        knucks.forEach((knuck) => {
            // console.log(knuck);
            const retVal = advanceRotation(knuck.direction, knuck.rotate.x, knuck.maxX);
            knuck.direction = retVal.direction;
            knuck.rotate.x = retVal.current;
        });
        illo.updateRenderGraph();
        // animate next frame
        requestAnimationFrame(animate);
    }
    // start animation
    animate();
}
function addFinger(fingerType, handBack) {
    let origin = {};
    switch (fingerType) {
        case 'pointer':
            origin = handBack.path[5]; // pointer root
            break;
        case 'middle':
            origin = handBack.path[4]; // middle root
            break;
        case 'ring':
            origin = handBack.path[3]; // ring root
            break;
        case 'pinkey':
            origin = handBack.path[2]; // pinkey root
            break;
        case 'thumb':
            origin = handBack.path[6]; // thumb root
            break;
    }
    let firstKnuck = new Zdog.Anchor({
        addTo: handBack,
        translate: origin,
        scale: getFingerScale(fingerType),
        rotate: getFirstKnuckRotation(fingerType),
    });
    firstKnuck.maxX = TAU / 4;
    firstKnuck.direction = (getRandomInt(1) ? 'WAX' : 'WANE');
    knucks.push(firstKnuck);
    let firstSegment = new Zdog.Shape({
        addTo: firstKnuck,
        path: [
            {},
            {y: -2}
        ],
        stroke: getStroke(fingerType),
        color: getSkinColor(),
    });
    let secondKnuck = new Zdog.Anchor({
        addTo: firstSegment,
        translate: { y: -2},
        rotate: getSecondKnuckRotation(fingerType),

    });
    secondKnuck.maxX = TAU / 4;
    secondKnuck.direction = (getRandomInt(1) ? 'WAX' : 'WANE');
    knucks.push(secondKnuck);
    let secondSegment = new Zdog.Shape({
        addTo: secondKnuck,
        path: [
            {},
            {y: -1.5}
        ],
        stroke: getStroke(fingerType),
        color: getSkinColor(),
    });
    
    let thirdKnuck = new Zdog.Anchor({
        addTo: secondSegment,
        translate: { y: -2},
        rotate: getThirdKnuckRotation(fingerType),
    });
    thirdKnuck.maxX = TAU / 4;
    thirdKnuck.direction = (getRandomInt(1) ? 'WAX' : 'WANE');
    knucks.push(thirdKnuck);
    let thirdSegment = new Zdog.Shape({
        addTo: thirdKnuck,
        path: [
            {},
            {y: -1}
        ],
        stroke: getStroke(fingerType),
        color: getSkinColor(),
    });
    addFingerNail(fingerType, thirdSegment);

    // handback.path[4] - middle root
    // handback.path[3] - ring root
    // handback.path[2] - pinkey root
}
function getSkinColor() {
    return '#dbc3a2';
}
function addFingerNail(fingerType, fingerSegment) {
    let fingerNail = new Zdog.Rect({
        addTo: fingerSegment,
        height: 1,
        width: .5,
        fill: true,
        stroke: .5,
        translate: {y: -1, z: 1},
        color: getFingerNailColor()
    });
}
function getFingerNailColor() {
    return '#f4e7d4';
}
function getZRotation(fingerType) {
    const zRotations = {
        pointer: -TAU / 16,
        middle: -TAU / 32,
        ring: 0,
        pinkey: TAU / 32,
        thumb: -TAU / 4,
    };
    return zRotations[fingerType];
}
function getFirstKnuckRotation(fingerType) {
    const FKRotations = {
        pointer: {x:randomizeRotation(TAU / 8), z: -TAU / 16},
        middle: {x:randomizeRotation(TAU / 8), z: -TAU / 32},
        ring: {x:randomizeRotation(TAU / 8), },
        pinkey: {x:randomizeRotation(TAU / 8), z: TAU / 32},
        thumb: {y: randomizeRotation(TAU / 16), z: -randomizeRotation(TAU / 4)},
    };
    return FKRotations[fingerType];
}
function getSecondKnuckRotation(fingerType) {
    const FKRotations = {
        pointer: {x:randomizeRotation(TAU / 4)},
        middle: {x:randomizeRotation(TAU / 4)},
        ring: {x:randomizeRotation(TAU / 4)},
        pinkey: {x:randomizeRotation(TAU / 4)},
        thumb: {x:randomizeRotation(TAU / 4)},
    }
    return FKRotations[fingerType];
}
function getThirdKnuckRotation(fingerType) {
    const FKRotations = {
        pointer: {x: randomizeRotation(TAU / 8)},
        middle: {x: randomizeRotation(TAU / 8)},
        ring: {x: randomizeRotation(TAU / 8)},
        pinkey: {x: randomizeRotation(TAU / 8)},
        thumb: {x: randomizeRotation(TAU / 8)},
    }
    return FKRotations[fingerType];
}
function getStroke(fingerType) {
    const fingerStrokes = {
        pointer: 2,
        middle: 2,
        ring: 2,
        pinkey: 1.5,
        thumb: 2,
    };
    return fingerStrokes[fingerType];
}
function getFingerScale(fingerType) {
    const fingerScales = {
        pointer: 1,
        middle: 1.2,
        ring: 1,
        pinkey: .7,
        thumb: 1,
    };
    return fingerScales[fingerType];
}
function addDebugAxes(addTo) {
    if (!globalDebug) return false;
    let xline = new Zdog.Shape({
        addTo: addTo,
        path: [
            { x: -50 },
            { x: 50 }
        ],
        stroke: .1,
        color: '#ff0000',
    });
    let yline = xline.copy({
        path: [
            { y: -50 },
            { y: 50 }
        ],
        color: '#0400ff',
    });
    let zline = xline.copy({
        path: [
            { z: -50 },
            { z: 50 }
        ],
        color: '#15ff00',
    });
}
function randomizeRotation(max) {
    const multiplier = getRandomInt(10) / 10;
    return max * multiplier;
};
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function advanceRotation(direction, current, max) {
    const increment = TAU / 1000;
    if (direction === 'WAX') {
        if (current >= max) {
            current = max;
            direction = 'WANE';
        } else {
            current += increment;
        }
    } else if (direction === 'WANE') {
        if (current <= 0) {
            current = 0;
            direction = 'WAX';
        } else {
            current -= increment;
        }
    } else {
        direction = 'WAX';
    }
    return {
        current,
        direction
    };
}

exports.newIllustration = function(className) {
    newIllustration(className);
};

// exports.mirrorCanvas = function(className) {
//     var canvas = document.getElementsByClassName(className)[0];
//     console.log('canvas', canvas);
//     var canvasElement = canvas;
//     var context = canvasElement.getContext('2d');
//     context.translate(canvasElement.width / 2, canvasElement.height / 2);
//     context.scale(-1, 1);
//     context.scale(-1, 1);
// };
