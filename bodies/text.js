class text {
    remove(stack) {
        Composite.remove(stack, stack.bodies[stack.bodies.length - 1])
        Composite.remove(stack, stack.constraints[stack.constraints.length - 1])
    }
    setContect(stack, content) {
        stack.render.text.content = `${content} cm`
    }
    create(stack) {
        const lastcos = Math.cos(stack.bodies[stack.bodies.length - 1].angle)
        const lastsin = Math.sin(stack.bodies[stack.bodies.length - 1].angle)
        const body = Bodies.rectangle(stack.bodies[stack.bodies.length - 1].position.x + (lastcos * 40), stack.bodies[stack.bodies.length - 1].position.y - (lastsin * -40), 35, 35, { 
            collisionFilter: { group: group },
            render: {
                fillStyle: "#E2ECF5",
                text:{
                    content: "У вас 0 cm",
                    color: "#1F2E37",
                    size: 24,
                    family: "Comfortaa",
                },
            },
            label: 'text',
            density: 0.00001,
            angle: stack.bodies[stack.bodies.length - 2].angle
        });
        const cos = Math.cos(body.angle)
        const sin = Math.sin(body.angle)
        Composite.add(stack, body)
        Composite.add(stack, Constraint.create({
            bodyB: body,
            bodyA: stack.bodies[stack.bodies.length - 4],
            pointB: { x: cos * -15, y: sin * -15},
            pointA: { x: cos * 22, y: sin * 82 - 35 },
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
    
    
}