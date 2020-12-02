const socket = io()

const 
    Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Query = Matter.Query,
    Events = Matter.Events,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Vector = Matter.Vector,
    Bounds = Matter.Bounds,
    Bodies = Matter.Bodies

// create engine
const 
    engine = Engine.create(),
    world = engine.world
    
// create renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        showAngleIndicator: false,
        showCollisions: false,
        showVelocity: false,
        wireframes: false,
        angles: false,
        background: '#E2ECF5'
    }
})

Render.run(render)

// create runner
const runner = Runner.create()
Runner.run(runner, engine)

world.gravity.y = 0

let towerHeight = 0,
    clientsCount = 0

// add bodies
const group = Body.nextGroup(true)
const group2 = Body.nextGroup(true)

//create head
const Head = new head({
    position: {x: 349, y: 410},
    xScale: .57,
    yScale: .58
}).create()



//create hair and constraint
const HairBody = new hair({
    position: {x: 350, y: 320}
})
const Hair = HairBody.create()
HairBody.createConstraint(Hair)


const EyeBody = new eyes({
    position: {x: 327, y: 400},
    eyeradius: 8,
    pupilradius: 4.5,
    eyecolor: '#F4F3EE',
    pupilcolor: '#1F2E37'
})
const Eye = EyeBody.create()


const addChain = (countChain) => {
    const RectHair = new recthair()
    const Hat = new hat()
    const Text = new text()
    
    Text.remove(Hair)
    Hat.remove(Hair)
    RectHair.remove(Hair)
    if(countChain != 0) {

        // add chain to hair
        for(let i = 0; i <= countChain - 1; i++) {
            HairBody.addChain(Hair)
        }
    }
    RectHair.create(Hair)
    Hat.create(Hair)
    Text.create(Hair)
    setContext(towerHeight)
}

function setContext (cc) {
    const Text = new text()
    if(!isNaN(cc)) {
        Text.setContect(Hair.bodies[Hair.bodies.length - 1], Number(cc).toFixed(3))
    } else {
        Text.setContect(Hair.bodies[Hair.bodies.length - 1], cc)
    }
}



function UpdateClick(cc) {
    if(cc < 0) { 
        towerHeight = 0
        return
    }
    towerHeight = cc
    setContext(towerHeight)
}

const textincdec = Composites.stack(0, 0, 1, 1, 10, 10, () => {}) 
World.add(world, textincdec)

function incTowerHeight () {
    
    const body = Bodies.rectangle(Hair.bodies[Hair.bodies.length - 1].position.x, Hair.bodies[Hair.bodies.length - 1].position.y, 35, 35, { 
        collisionFilter: { group: group, group: group2 },
        label: 'pointinc',
        render: {
            fillStyle: "#E2ECF5",
            text:{
                content: "+1",
                color: "#96CE73",
                size: 24,
                family: "Comfortaa",
            },
        },
        frictionAir: 0.3
    });
    Body.applyForce(body, {x: body.position.x, y: body.position.y}, {x: 0, y: -.05})
    if(textincdec.bodies.length) {
        Composite.clear(textincdec)
    }
    Composite.add(textincdec, body) 


    UpdateClick(towerHeight + 0.001)
    socket.emit('clickInc')
}

function decTowerHeight () {
    const body = Bodies.rectangle(Hair.bodies[Hair.bodies.length - 1].position.x, Hair.bodies[Hair.bodies.length - 1].position.y, 35, 35, { 
        collisionFilter: { group: group, group: group2 },
        label: 'pointinc',
        render: {
            fillStyle: "#E2ECF5",
            text:{
                content: "-3",
                color: "#CE7373",
                size: 24,
                family: "Comfortaa",
            },
        },
        frictionAir: 0.3
    });
    Body.applyForce(body, {x: body.position.x, y: body.position.y}, {x: 0, y: -.05})
    if(textincdec.bodies.length) {
        Composite.clear(textincdec)
    }
    Composite.add(textincdec, body) 



    if(towerHeight <= 0) return
    UpdateClick(towerHeight - 0.003)
    if(towerHeight < 0) towerHeight = 0
    socket.emit('clickDec')
}

function removeOneChain () {
    if(towerHeight <= 20) return
    HairBody.removeChain(Hair)
    setContext(towerHeight)
}



const addOneChain = () => {
    const RectHair = new recthair()
    const Hat = new hat()
    const Text = new text()
    
    Text.remove(Hair)
    Hat.remove(Hair)
    RectHair.remove(Hair)
    
    HairBody.addChain(Hair)
    RectHair.create(Hair)
    Hat.create(Hair)
    Text.create(Hair)
    setContext(towerHeight)
}
setInterval(() => {
    if(textincdec.bodies.length) {
            Composite.remove(textincdec, textincdec.bodies[0])
        // setTimeout(() => {
        // }, 2000);
    }


    let lastcountChain = Hair.bodies.length - 3
    let countChain = towerHeight / 20 
    countChain = Math.floor(countChain) 
    if(lastcountChain < countChain) {
        addOneChain()
        lastcountChain = countChain
    } else if(lastcountChain > countChain) {
        removeOneChain()
        lastcountChain = countChain
    }

}, 1000);

new recthair().create(Hair)
new hat().create(Hair)
new text().create(Hair)


//add objects
World.add(world, [Head, Hair, Eye])

function UpdateUsers(count) {
    clientsCount = count
    document.querySelector('.users-online').textContent = `Онлайн: ${clientsCount}`
}

socket.on('connection', (cc) => {
    bgMusic()
    UpdateClick(cc)
    let countChain = cc / 20 
    countChain = Math.floor(countChain) - 1
    addChain(countChain)
    firststart()
})

function firststart() {
    let translate = {
        x: 0,
        y: Hair.bodies[Hair.bodies.length - 1].bounds.max.y - 200
    }

    if (render.bounds.max.y + translate.y > world.bounds.max.y)
        translate.y = world.bounds.max.y - render.bounds.max.y;
        
    Bounds.translate(render.bounds, translate)
}

socket.on('clickInc', UpdateClick)
socket.on('clickDec', UpdateClick)
socket.on('autoDec', UpdateClick)
socket.on('updateUserCount', UpdateUsers)


// add mouse control
const 
    mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.001,
            render: {
                visible: false
            }
        }
    });
    
let mouseCoord = { x: 0, y: 0 }

// add events 
Events.on(mouseConstraint, "mousemove", (e) => {
    mouseCoord.x = e.mouse.position.x
    mouseCoord.y = e.mouse.position.y
    EyeBody.cursorLook(Eye.bodies[2], Eye.bodies[3], mouseCoord)
    
})
let btnclick = false
Events.on(mouseConstraint, "enddrag", (e) => {
    let bodies = Composite.allBodies(engine.world)
    let point = Query.point(bodies, e.mouse.position)

    if(e.body.label != 'glad' && e.body.label != 'pointinc') {
        if(point.length == 0) {

            btnclick = true
            setTimeout(() => {
                btnclick = false
            }, 500);
    
            const audio = new Audio()
            audio.src = 'sounds/tap.mp3'
            audio.play()
    
            decTowerHeight()
        }
    }
})

document.addEventListener('click', () => {
    bgMusicplay.play()
    let bodies = Composite.allBodies(engine.world)
    let point = Query.point(bodies, mouseConstraint.mouse.position)
    let bool = true
    // if(point.length != 0) {
    // }
    point.forEach(function(body){
        if(body.label != 'glad' && body.label != 'pointinc' && bool ) {
            let compound = Hair.bodies[Hair.bodies.length - 3]
            btnclick = true
            setTimeout(() => {
                btnclick = false
            }, 500);
    
            const audio = new Audio()
            audio.src = 'sounds/tap.mp3'
            audio.play()
    
            let rand = getRandomFloat(-.1, .1)
            Body.setAngularVelocity(compound, rand);
            incTowerHeight()
            bool = false
        }
    });
})

// add mouse
World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 700, y: 600 }
});

// get the centre of the viewport
let viewportCentre = {
    x: render.options.width * 0.5,
    y: render.options.height * 0.5
};

// make the world bounds a little bigger than the render bounds
world.bounds.min.y = -300;
world.bounds.max.y = 600;

// keep track of current bounds scale (view zoom)
let boundsScaleTarget = 1,
    boundsScale = {
        x: 1,
        y: 1
    },
    animid = 0

document.addEventListener( 'visibilitychange' , function() {
    if (document.hidden) {
        bgMusicplay.pause()
        
    } else {
        bgMusicplay.play()
    }
}, true );

// use the engine tick event to control our view
Events.on(engine, 'beforeTick', function() {
    var world = engine.world,
        mouse = mouseConstraint.mouse,
        translate;
    
    // mouse wheel controls zoom
    var scaleFactor = mouse.wheelDelta * -0.1;
    if (scaleFactor !== 0) {
        if ((scaleFactor < 0 && boundsScale.x >= 0.6) || (scaleFactor > 0 && boundsScale.x <= 1.4)) {
            boundsScaleTarget += scaleFactor;
        }
    }
    
    // if scale has changed
    if (Math.abs(boundsScale.x - boundsScaleTarget) > 0.01) {
        scaleFactor = (boundsScaleTarget - boundsScale.y) * 0.2;

        boundsScale.y += scaleFactor;

        translate = {
            x: 0,
            y: render.options.height * scaleFactor * 0.5
        };
        if (render.bounds.max.y + translate.y > world.bounds.max.y)
            translate.y = world.bounds.max.y - render.bounds.max.y;

        Bounds.translate(render.bounds, translate);
    }
    
    if(towerHeight <= 0 && btnclick != true) {
        Head.render.sprite.texture = 'img/head0_ny.png'
        animid = 1
        Head.position.y = 426;
        Hair.bodies[2].render.visible = false;
        Hair.bodies[1].render.visible = false;
        Hair.bodies[0].render.visible = false;
    } else if(towerHeight >= 0 && btnclick != true) {
        Head.render.sprite.texture = 'img/head_ny.png'
        animid = 2
        Head.position.y = 442;
        Hair.bodies[2].render.visible = true;
        Hair.bodies[1].render.visible = true;
        Hair.bodies[0].render.visible = true;
    } 
    if(animid == 1 && btnclick == true) {
        Head.position.y = 424;
        Head.render.sprite.texture = 'img/head0A_ny.png'
    } else if(animid == 2 && btnclick == true) {
        Head.position.y = 440;
        Head.render.sprite.texture = 'img/headA_ny.png'
    }
    
    if(towerHeight <= 0) {
        setContext('У вас 0')
    }
});

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}