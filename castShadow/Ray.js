class Ray {
    // init context
    context = document.getElementById("canvas").getContext('2d');
    ////
    origin;
    length;
    angle;
    end;
    referenceRay;
    checkedPt = [];
    closestPt = null;

    // arguments :
    // origin est le point d'émission du rayon
    // length à titre indicatif pour l'initalisation du rayon
    // angle permet d'orienter le rayon par rapport à son centre et un rayon d'origine
    // avec un angle de 0 et une taille arbitraire connue
    constructor(origin, length, angle, color, lineWidth ) {
        this.origin = origin;
        this.length = length;
        this.angle = angle;
        this.end = this.findEnd();
        this.context.strokeStyle = color;
        this.context.lineWidth = lineWidth;
    }
}

// PROTOS //

// affiche l'objet ray
Ray.prototype.show = function() {
    Draw.line(this.context, this.origin, this.end);
}

// permet de trouver les coordonnées du point end en ayant l'angle entre le ray et
// le rayon d'origine du cercle et la longueur du rayon
Ray.prototype.findEnd = function() {
    let x = (Math.cos(this.angle) * this.length) + this.origin.x;
    let y = (Math.sin(this.angle) * this.length) + this.origin.y;
    return new Vector(x, y);
}

// permet de bouger le rayon en lui passant une nouvelle origine
// il calcule son nouveau point "end" en maintenant l'angle donné en argumment
// lors de son instanciation
Ray.prototype.move = function(origin) {
    // on bouge la source de ray
    this.origin = origin;
    // on bouge son point d'arrivée en fonction de l'origine et de l'angle du ray dans Light
    this.end = this.findEnd();
}

// verifie une éventuelle intersection avec tous les murs présents dans l'array walls
// passé en argument
Ray.prototype.touch = function(walls) {
    // array qui stock tous les points d'intersection pendant l'eecution
    // de touch. Permet de comparer les points d'intersection entre eux et
    // de choisir le plus proche de la source lumineuse
    let intersectPt = [];
    for(let i = 0; i<walls.length; i++) {
        // on va chercher t et u
        // réattribution des valeurs à des variables permettant une meilleure lecture de l'équation

        // pour wall
        const x1 = walls[i].origin.x;
        const y1 = walls[i].origin.y;
        const x2 = walls[i].end.x;
        const y2 = walls[i].end.y;

        // pour ray
        const x3 = this.origin.x;
        const y3 = this.origin.y;
        const x4 = this.end.x;
        const y4 = this.end.y;


        // calcul du dénominateur (commun à t et u)
        const den = ( ((x1-x2) * (y3-y4)) - ((y1-y2) * (x3-x4)) );
        // les droites sont parallèles si den == 0 donc arrête la vérification pour ce mur

        // sinon il y a intersection donc on continue l'analyse
        if(den != 0) {

            const t = ( ((x1-x3) * (y3-y4)) - ((y1-y3) * (x3-x4)) ) / den;

            const u = - (( ((x1-x2) * (y1-y3)) - ((y1-y2) * (x1-x3)) ) / den);

            /* SI 0 < t < 1 ET u > 0
            * pour u modification de la formule original car on ne vérifie le
            * croisement avec une ligne que dans un sens, le sens d'émission du rayon)
            */

            // si cette condition est respectée alors il y a intersection
            if(t > 0 && t < 1 && u > 0) {
                // on calcule la valeur de x d'après t
                let ptX = x1 + (t * (x2 - x1));

                // on calcule la valeur de y d'après t
                let ptY = y1 + (t * (y2 - y1));

                let pt = new Vector(ptX,ptY);

                // on ajoute le nouveau point au tableau checkedPt
                intersectPt.push(pt);
            }
            // on verifie quel est le mur le plus proche
            for(let j = 0; j<intersectPt.length; j++) {
                if(this.closestPt == null) {
                    // initialise closestPt avec la première valeur de checkedPt pour
                    // pouvoir commencer la comparaison avec les valeurs suivante
                    this.closestPt = intersectPt[0];
                } else {
                    // sinon closestPt a déjà une valeur, on la compare aux suivantes
                    // dans le tableau

                    // on calcule la distance entre origin et l'actuel closestPt
                    let a = this.origin.distanceFrom(this.closestPt);

                    // on calcule la distance entre pos et la valeur du checkedPt actuel
                    let b = this.origin.distanceFrom(intersectPt[j]);
                    // si b < a , la valeur du checkedPt actuel remplace la valeur du closestPt
                    if(a > b) {
                        this.closestPt = intersectPt[j]
                    }
                }
            }
            // on modifie la valeur du point dir pour affecter le nouveau tracé de ray
            if(this.closestPt != null) {
                this.end.move(this.closestPt.x, this.closestPt.y);

                // mise à jour de la longueur de ray
                this.length = this.origin.distanceFrom(this.end);
            }

            // on réinitialise le closestPt sinon une fois le point le plus proche trouvé,
            // plus aucune mise à jour possible de ce point
            this.closestPt = null;
        }
    }
}
