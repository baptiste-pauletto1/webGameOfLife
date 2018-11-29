let Grille;

(function () {
    "use strict";

    Grille = function (h,l,dest) {
        this.hauteur = h || 8;
        this.largeur = l || 8;
        let grille = $(dest);
        let self = this;
        this.tab = [];

        this.click_case = function () {
            let x = $(this).data('x');
            let y = $(this).data('y');
            $(this).css('background-color','black');
        };

        this.creer_case_noire = function (x,y) {
            return $('<div />')
                .addClass('case-noire')
                .data('x', x)
                .data('y', y)
                .click(self.click_case);
        };

        this.creer_case_blanche = function (x,y) {
            return $('<div />')
                .addClass('case-blanche border border-secondary')
                .data('x',x)
                .data('y',y)
                .click(self.click_case);
        };

        for (let x = 0;x<this.hauteur;++x){
            let tmpColumn = $('<div />');
            this.tab[x] = [];
            for (let y = 0;y<this.largeur;++y) {
                this.tab[x].push(null);
                tmpColumn.append(this.creer_case_blanche(x, y))
            }
            grille.append(tmpColumn);
        }

    };
}) ();