(function () {

    "use strict";

    $(() => {
        let grille = new Grille(50,50,'#mainGrid');

        $("#iter").click(function () {
            grille.uneIteration();
        })

    });

}) ();