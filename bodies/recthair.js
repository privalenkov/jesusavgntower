class recthair {
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
                    texture: 'img/hairrect.png',
                    xScale: .6,
                    yScale: .6
                }
            },
            gravityScale: -1,
            density: 0.00001,
            angle: stack.bodies[stack.bodies.length - 1].angle
        });
        const cos = Math.cos(body.angle)
        const sin = Math.sin(body.angle)
        Composite.add(stack, body)
        Composite.add(stack, Constraint.create({ 
            bodyB: body,
            bodyA: stack.bodies[stack.bodies.length - 2],
            pointB: { x: cos * -15 - 8, y: sin * -15},
            pointA: { x: cos * 22 + 8, y: sin * 22 },
            stiffness: 1,
            length: 0,
            render: {
                visible: false,
                angles: false
            },
            angleAMin:  0.2 + Math.PI / 2,
            angleAMax: -0.2 + Math.PI / 2,
            angleAStiffness: 0.01,
            angleBMin:  0.2 + Math.PI / 2,
            angleBMax: -0.2 + Math.PI / 2,
            angleBStiffness: 0.01
        }))
    }
    
}