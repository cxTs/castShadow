class Light {
    context = document.getElementById("canvas").getContext('2d');
    ////

    center;
    nbRay;
    rays = [];
    angle;
    radius; // rayon fixe pour calcul de l'angle de chaque Ray ajouté à Light
    color;
    arcSize = Math.PI * 2;

    // arguments : x et y pour le centre et nb pour le nombre de rayons
    constructor(x, y, nbRay, radius, color) {
        this.center = new Vector(x, y);
        this.nbRay = nbRay;
        this.angle = this.arcSize / this.nbRay;
        this.radius = radius;
        this.color = color;
        this.populateRays();
    }

    populateRays() {
        let angle = 0;
        for(let i = 0; i < this.nbRay; i++) {
            // on peuple rays avec nbRay le même objet ray
            // on incrémente l'angle de lui-même à chaque nouveau rayon
            this.rays.push(new Ray(this.center, this.radius, angle, this.color, 1))
            angle += this.arcSize / this.nbRay;

        }
    }

    show() {
        //Draw.arc(context, this.center, this.radius, 0, this.arcSize);
        for(let ray of this.rays) {
            ray.show();
        }
    }


    // permet de calculer un ensemble de points (Vector)
    // autour d'un cercle imaginaire ayant pour centre le Vector centre de Light et un rayon donné
    // en paramètre

    vectorsOnArc() {
        let nbVectors = this.nbRay;
        let vectors = [];
        let a = 0;
        for(let i = 0; i <= nbVectors; i++) {
            let x = (Math.cos(a) * this.radius) + this.center.x;
            let y = (Math.sin(a) * this.radius) + this.center.y;
            vectors.push(new Vector(x, y));
            a += this.angle;
        }
        // retourne la liste de Vector disposés sur le cercle autour this.center
        return vectors;
    }

    touch(walls) {
        for(let ray of this.rays) {
            ray.touch(walls);
        }
    }


    // follow(e) {
    /* OK
    // follow(e, walls) {
    //     let x = e.clientX;
    //     let y = e.clientY;
    //     this.center.move(x, y);
    //     for(let ray of this.rays) {
    //         ray.origin = this.center;
    //         ray.touch(walls);
    //     }
    // }
    */
    follow(e, walls) {
        let x = e.clientX;
        let y = e.clientY;
        this.center.move(x, y);
        for(let ray of this.rays) {
            ray.move(this.center);
            ray.touch(walls);
            ray.show();
        }
    }



}
