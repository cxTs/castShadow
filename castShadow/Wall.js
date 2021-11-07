class Wall {
    ctx;
    origin;
    end;

    constructor(ctx, xOrigin, yOrigin, xEnd, yEnd) {
        this.ctx = ctx;
        this.origin = new Vector(xOrigin, yOrigin);
        this.end = new Vector(xEnd, yEnd);
    }
}

// PROTOTYPES
Wall.prototype.newRandom = function() {
        let maxX = document.getElementById('canvas').offsetHeight;
        let maxY = document.getElementById('canvas').offsetWidth;

        let x1 = Math.ceil(Math.random() * (maxX-0) + 0);
        let y1 = Math.ceil(Math.random() * (maxY-0) + 0);
        this.origin = new Vector(x1, y1);

        let x2 = Math.ceil(Math.random() * (maxX-0) + 0);
        let y2 = Math.ceil(Math.random() * (maxY-0) + 0);
        this.end = new Vector(x2, y2);
    }

Wall.prototype.show = function() {
        ctx.save();
        ctx.strokeStyle = "#11111133";
        ctx.lineWidth = 3;
        Draw.line(this.context, this.origin, this.end);
        ctx.restore();
}
