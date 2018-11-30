let Grille;

(function () {
    "use strict";

    Grille = function (h,l,dest) {
        this.hauteur = h || 8;
        this.largeur = l || 8;
        let grille = $(dest);
        let self = this;
        this.tab = [];
        this.nextTab = [];
        this.notNextTab = [];

        this.click_case = function () {
            let x = $(this).data('x');
            let y = $(this).data('y');

            if($(this).data('type') === 0){
                $(this).css('background-color','black');
                $(this).data('type',1);
                self.tab[x][y] = 1;
                console.log(x,y,$(this).data('type'));
            } else {
                $(this).css('background-color','white');
                $(this).data('type',0);
                self.tab[x][y] = 0;
                console.log(x,y,$(this).data('type'));

            }
        };

        this.creer_case_blanche = function (x,y) {
            return $('<div />')
                .addClass('case-blanche border border-secondary')
                .data('x',x)
                .data('y',y)
                .data('type',0)
                .click(self.click_case);
        };
        this.checkVoisin = function (x,y) {
            let cptVoisin = 0;
            if(self.tab[x+1][y]=== 1){cptVoisin++;}
            if(self.tab[x+1][y+1]=== 1){cptVoisin++;}
            if(self.tab[x+1][y-1]=== 1){cptVoisin++;}
            if(self.tab[x][y+1]=== 1){ cptVoisin++;}
            if(self.tab[x][y-1]=== 1){ cptVoisin++;}
            if(self.tab[x-1][y-1]=== 1){cptVoisin++;}
            if(self.tab[x-1][y]=== 1){cptVoisin++;}
            if(self.tab[x-1][y+1] === 1){cptVoisin++;}
            return cptVoisin;
        };

        this.uneIteration = function () {
            $.each( $("#mainGrid"), function (i) {
                $('div').each(function () {
                    if(typeof $(this).data('type') === "number") {
                        let x = $(this).data('x');
                        let y = $(this).data('y');
                        if (self.checkVoisin(x, y) === 3) {
                            $(this).css('background-color', 'black');
                            $(this).data('type', 1);
                            self.nextTab[x][y] = 1;
                        } else if($(this).data('type') === 1 && self.checkVoisin(x, y) === 2 || self.checkVoisin(x, y) === 3){
                            self.nextTab[x][y] = 1;
                        }else {
                            $(this).css('background-color','white');
                            $(this).data('type',0);
                        }
                    }
                })
            });
            console.log(self.nextTab);
            for(let i = 0; i <this.hauteur; i++){
                for(let j = 0;j<this.largeur ;j++){
                    if(self.nextTab[i][j] === 1){
                        self.tab[i][j] = 1;
                    } else {
                        self.tab[i][j] = 0;
                    }

                }

            }

        };
        this.tab.push(null);
        this.tab[0] = [];
        for(let i = 0; i <this.largeur+1;i++){
            this.tab[0].push(0);
        }
        for(let a = 0; a <this.hauteur;a++){
            this.nextTab[a] = [];
            for (let b = 1;b<this.largeur;++b) {
                this.nextTab[a].push(0);
            }
        }
        for (let x = 1;x<this.hauteur;++x){
            let tmpColumn = $('<div />');
            this.tab[x] = [];
            this.tab[x].push(0);

            for (let y = 1;y<this.largeur;++y) {
                this.tab[x].push(0);

                tmpColumn.append(this.creer_case_blanche(x, y))
            }
            this.tab[x].push(0);
            grille.append(tmpColumn);
        }
        this.tab.push(null);
        this.tab[this.hauteur] = [];
        this.tab.push(null);
        this.tab[this.hauteur+1] = [];

        for(let x = 0; x <this.largeur+1;x++){
            this.tab[this.hauteur].push(0);
            this.tab[this.hauteur+1].push(0);
        }
    };
}) ();