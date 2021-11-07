class Vector {
    context = document.getElementById("canvas").getContext('2d');
    ////
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // bouge le vecteur selon les  coordonnées passées en arguments
    move(x, y) {
        this.x = x;
        this.y = y;
    }

    // calcul la distance entre le veteur et un autre vecteur passé en argument
    distanceFrom(vector) {
        return Math.sqrt( Math.pow((vector.x-this.x), 2) + Math.pow((vector.y-this.y), 2) );
    }

    // trace le vecteur
    show() {
        this.context.strokeStyle = "#F00";
        this.context.lineWidth = 1;
        Draw.arc(this.context, this, 2, 0, (Math.PI * 2));
    }

}
