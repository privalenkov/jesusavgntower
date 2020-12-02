class hat {
    remove(stack) {
        Composite.remove(stack, stack.bodies[stack.bodies.length - 1])
        Composite.remove(stack, stack.constraints[stack.constraints.length - 1])
    }
    create(stack) {
        const lastcos = Math.cos(stack.bodies[stack.bodies.length - 1].angle)
        const lastsin = Math.sin(stack.bodies[stack.bodies.length - 1].angle)
        const body = Bodies.rectangle(stack.bodies[stack.bodies.length - 1].position.x + (lastcos * 40), stack.bodies[stack.bodies.length - 1].position.y - (lastsin * -40), 15, 55, { 
            collisionFilter: { group: group },
            render: {
                sprite: {
                    texture: 'img/hat.png',
                    xScale: .6,
                    yScale: .6
                }
            },
            label: 'hat',
            gravityScale: -1,
            density: 0.00001,
            // angle: stack.bodies[stack.bodies.length - 2].angle
        });
        const cos = Math.cos(body.angle)
        const sin = Math.sin(body.angle)
        Composite.add(stack, body)
        Composite.add(stack, Constraint.create({ 
            bodyB: body,
            bodyA: stack.bodies[stack.bodies.length - 3],
            pointB: { x: cos * -15 + 19, y: sin * -15 + 24 },
            pointA: { x: cos * 22 - 32, y: sin * 22 - 34 },
            stiffness: 1,
            length: 0,
            render: {
                visible: false,
                angles: false
            },
            // angleAMin:  0.2 + Math.PI / 2,
            // angleAMax: -0.2 + Math.PI / 2,
            // angleAStiffness: 0.01,
            // angleBMin:  0.2 + Math.PI / 2,
            // angleBMax: -0.2 + Math.PI / 2,
            angleBStiffness: .05
        }))
    }
    
}