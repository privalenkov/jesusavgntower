class hair {
    constructor ({position}) {
        this.position = position
    }
    create() {
        return Composites.stack(this.position.x, this.position.y, 1, 1, 10, 0, function(x, y) {
            return Bodies.rectangle(x  - 41, y, 110, 80, { 
                collisionFilter: { group: group }, 
                render: {
                    sprite: {
                        texture: 'img/Rect.png',
                        xScale: .6,
                        yScale: .6
                    }
                },
                density: 0.00001,
                angle: -1.55
            })
        })
    }
    createConstraint(stack) {
        Composite.add(stack, Constraint.create({ 
            bodyB: stack.bodies[0],
            pointB: { x: 0, y: 15 },
            pointA: { x: stack.bodies[0].position.x, y: stack.bodies[0].position.y + 15 },
            stiffness: 1,
            render: {
                visible: false,
                angles: true
            },
            angleAMin: Math.PI / 2,
            angleAMax: Math.PI / 2,
            angleAStiffness: 0.01,
            angleBMin: Math.PI / 2,
            angleBMax: Math.PI / 2,
            angleBStiffness: 0.01
        }));
    }
    addChain(stack) {
        const lastcos = Math.cos(stack.bodies[stack.bodies.length - 1].angle)
        const lastsin = Math.sin(stack.bodies[stack.bodies.length - 1].angle)
        const body = Bodies.rectangle(stack.bodies[stack.bodies.length - 1].position.x + (lastcos * 40) , stack.bodies[stack.bodies.length - 1].position.y - (lastsin * -40), 110, 80, { 
            collisionFilter: { group: group }, 
            render: {
                sprite: {
                    texture: 'img/Rect.png',
                    xScale: .6,
                    yScale: .6
                }
            },
            density: 0.00001,
            ignoreGravity: true,
            angle: stack.bodies[stack.bodies.length - 1].angle
        });
        const cos = Math.cos(body.angle)
        const sin = Math.sin(body.angle)
        Composite.add(stack, body)
        Composite.add(stack, Constraint.create({ 
            bodyB: body,
            bodyA: stack.bodies[stack.bodies.length - 2],
            pointB: { x: cos * -15, y: sin * -15},
            pointA: { x: cos * 22, y: sin * 22 },
            stiffness: 1,
            length: 0,
            render: {
                visible: false,
                angles: false
            },
            angleAMin: Math.PI / 2,
            angleAMax: Math.PI / 2,
            angleAStiffness: 0.01,
            angleBMin: Math.PI / 2,
            angleBMax: Math.PI / 2,
            angleBStiffness: 0.01
        }))
    }
    removeChain(stack) {
        for(let i = 0; i <= 3; i++) {
            Composite.remove(stack, stack.bodies[stack.bodies.length - 1])
            Composite.remove(stack, stack.constraints[stack.constraints.length - 1])
        }
        new recthair().create(Hair)
        new hat().create(Hair)
        new text().create(Hair)
    }
}