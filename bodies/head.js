class head {
    constructor ({position, xScale, yScale}) {
        this.position = position
        this.xScale = xScale
        this.yScale = yScale
    }
    create() {
        return Body.create({ 
            collisionFilter: { group: group },
            position: this.position,
            render: {
                zIndex: 1,
                sprite: {
                    texture: 'img/head.png',
                    xScale: this.xScale,
                    yScale: this.yScale
                }
            },
            isStatic: true
        })
    }
    
    
}