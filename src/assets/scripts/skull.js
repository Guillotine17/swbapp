let isSpinning = false;
let eyeColor = '#FED';
let skullColor = '#bb9';
const TAU = Zdog.TAU;
let jawDepth = 4;
let jawWidth = 4;
let jawHeight = 6;

function newIllustration(className) {
    let teeth = [];
    const eyebrowAngle = getEyeAngle();
    let illo = new Zdog.Illustration({
        element: className,
        // zoom up 4x
        zoom: 10,
        dragRotate: true,
        // stop rotation when dragging starts
        onDragStart: function() {
            eyeColor = '#C00';
            this.isSpinning = false;
            colorChildren(teethGroup, '#C00');
            colorChildren(eyeGroup, '#C00');
        },
        onDragEnd: function() {
            this.isSpinning = true;
            eyeColor = '#FED';
            colorChildren(teethGroup, '#FED');
            colorChildren(eyeGroup, '#FED');
        },
    });
    illo.isSpinning = isSpinning;
    let head = new Zdog.Shape({
        addTo: illo,
        stroke: 12,
        color: skullColor,
    });


    let eyeGroup = new Zdog.Group({
        addTo: head,
    });
    let eyeLeft = new Zdog.Ellipse({
        addTo: eyeGroup,
        diameter: 2,
        quarters: 2, // semi-circle
        translate: { x: -3, y: -1, z: 4.5 },
        // rotate semi-circle to point up
        rotate: { z: eyebrowAngle },
        color: eyeColor,
        stroke: 0.5,
        fill: true,
        // hide when front-side is facing back
        // backface: false,
    });
    let eyeRight = eyeLeft.copy({
        translate: { x: 3, y: -1, z: 4.5 },
        rotate: {y: TAU / 2, z: eyebrowAngle}
    });
    let jaw = new Zdog.Box({
        addTo: head,
        height: jawHeight,
        width: jawWidth + 2,
        depth: jawDepth,
        translate: { y: 4, z: 3 },
        stroke: false,
        color: skullColor,
    });
    let teethGroup = new Zdog.Group({
        color: eyeColor,
        addTo: jaw,
    });
    
    let noseLeft = new Zdog.Shape({
        addTo: teethGroup,
        translate: {
            x: -0.5, y: -2, z: 3
        },
        path: [
            {
                x: 0, y: 0, z: 0
            },
            {
                x: 0, y: -1, z: 0
            },
            {
                x: -0.5, y: 0, z: 0
            }
        ],
        stroke: 0.5,
        color: eyeColor,
    });
    let noseRight = noseLeft.copy({
        translate: {
            x: 0.5, y: -2, z: 3
        },
        rotate: {y: TAU / 2}
    });
    // make top teeth
    const maxTeeth = 6;

    for (let index = 0; index < maxTeeth; index++) {
        if (skipTooth()) continue;
        teeth.push(generateTooth(index + 1, maxTeeth, jawWidth, 0, teethGroup));
    }
    for (let index = 0; index < maxTeeth; index++) {
        if (skipTooth()) continue;
        teeth.push(generateTooth(index + 1, maxTeeth, jawWidth, 1, teethGroup));
    }
    const rotateRateX = (getRandomInt(10) / 100);
    const rotateRateY = (getRandomInt(10) / 100);
    const rotateRateZ = (getRandomInt(10) / 100);
    function animate() {
        // rotate illo each frame
        if (illo.isSpinning) {
            illo.rotate.x += rotateRateX;
            illo.rotate.y += rotateRateY;
            illo.rotate.z += rotateRateZ;
        }
        illo.updateRenderGraph();
        // animate next frame
        requestAnimationFrame(animate);
    }
    // start animation
    animate();
}

function generateTooth(toothNumber, maxTeeth, jawWidth, yOffset, addTo) {
    let toothWidth = 0.5;
    let widthPerTooth = jawWidth / maxTeeth;
    let xOffset = widthPerTooth * toothNumber;
    xOffset = xOffset - jawWidth / 2;
    xOffset = xOffset - widthPerTooth / 2;
    console.log('tooth number:' + toothNumber);
    console.log('xOffset:' + xOffset);
    if (yOffset === undefined) {
        yOffset = 0;
    }
    return new Zdog.Box({
        addTo: addTo,
        color: eyeColor,
        height: 0.8,
        width: toothWidth,
        depth: 0.5,
        stroke: false,
        translate: {x: xOffset, z: (jawDepth / 2 + 0.5), y: yOffset},
        // backface: false,
    });
    // return tooth;
}

function skipTooth() {
    const oneInWhat = 8;
    return (getRandomInt(oneInWhat) === 0);
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function colorChildren(parent, colorCode) {
    parent.color = colorCode;
    if (parent.children) {
        parent.children.forEach((child, index, children) => {
            parent.children[index] = colorChildren(parent.children[index], colorCode);
        });
    }
    return parent;
}

function getEyeAngle() {
    const defaultRotation = TAU / 4;
    let angleMultiplier = getRandomInt(8) - 4;
    console.log('angleMultiplier: ' + angleMultiplier);
    return (angleMultiplier * (TAU / 32)) + defaultRotation;
}

exports.newIllustration = function(className) {
    newIllustration(className);
};
