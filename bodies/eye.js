class eye {
    constructor ({position, radius, color}) {
        this.position = position
        this.radius = radius
        this.color = color
    }
    create() {

        const 
            radius = this.radius,
            color = this.color

        return Composites.stack(this.position.x, this.position.y, 2, 1, 15, 0, function(x, y) {
            return Bodies.circle(x, y, radius, { 
                collisionFilter: { group: group },
                render: {
                    zIndex: 1,
                    fillStyle: color,
                },
                isStatic: true
            })
        }) 
        
    }
    addPupil(stack, x, y, radius, color) {
        const pupil = Bodies.circle(x, y, radius, { 
            collisionFilter: { group: group },
            render: {
                zIndex: 1,
                fillStyle: color,
            },
            isStatic: true
        })
        Composite.add(stack, pupil)
    }
    
}

class eyes {
    constructor ({position, eyeradius, pupilradius, eyecolor, pupilcolor}) {
        this.position = position
        this.eyeradius = eyeradius
        this.pupilradius = pupilradius
        this.eyecolor = eyecolor
        this.pupilcolor = pupilcolor
    }
    create() {

        const eyebody = new eye({
            position: {x: this.position.x, y: this.position.y},
            radius: this.eyeradius,
            color: this.eyecolor
        })
        const eyes = eyebody.create()
        eyebody.addPupil(eyes, this.position.x + 8, this.position.y + 8, this.pupilradius, this.pupilcolor)
        eyebody.addPupil(eyes, this.position.x + 38, this.position.y + 8, this.pupilradius, this.pupilcolor)

        return eyes
    }
    cursorLook(body1, body2, Mousepos) {
        if(Mousepos.x >= body1.position.x + 40) {
            if(body1.position.x <= 335) {
                Body.setPosition(body1, {x: body1.position.x + 2, y: body1.position.y})
                Body.setPosition(body2, {x: body2.position.x + 2, y: body2.position.y})
            }
        } else if(Mousepos.x <= body1.position.x - 40) {
            if(body1.position.x >= 335) {
                Body.setPosition(body1, {x: body1.position.x - 2, y: body1.position.y})
                Body.setPosition(body2, {x: body2.position.x - 2, y: body2.position.y})
            }
        } else {
                Body.setPosition(body1, {x: 335 , y: 408})
                Body.setPosition(body2, {x: 365 , y: 408})
        }
        
        if(Mousepos.y >= body1.position.y + 40) {
            if(body1.position.y <= 408) {
                Body.setPosition(body1, {x: body1.position.x, y: body1.position.y + 2})
                Body.setPosition(body2, {x: body2.position.x, y: body2.position.y + 2})
            }
        } else if(Mousepos.y <= body1.position.y - 40) {
            if(body1.position.y >= 408) {
                Body.setPosition(body1, {x: body1.position.x, y: body1.position.y - 2})
                Body.setPosition(body2, {x: body2.position.x, y: body2.position.y - 2})
            }
        }
    }
}