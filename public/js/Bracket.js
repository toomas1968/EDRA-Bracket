class Bracket {

    constructor(entries) {
        // Saad muuta neid. Ajavõtt arvestab võidu ära ja postib ära... aga winoverride või STG rule joone ületus. Kuidagi peaks saama seda muuta...
        // Saab baasist ülekirjutada round 4
        // Update ... else insert .. Query insert.. 

        // Kuidagi query öelda, et lvier results ID kvuab et muuta.. mingi general conf leht kus saab dynaamiliselt võtta seda eventID


        // 1. Create Event leht. Saad teha eventi aga ainult 1 saab olla aktiivne. See peab olema ka API mille URLI saab pärast hakata live/index.php (live.edra.ee) queryba. query peaks toimima selliselt, et kui backendis
        // muudad ühe eventi aktiivseks siis nende tulemusi ta näitab live edra ee's

        // 2. Peaks tegema sellise ägeda fix lehe kus on pm text field ja sinna saad panna query mida siis executetakse baasis. 

        //Update if exists tabelisse lisamise..  



        // Each round of elimiator is one array. ring_round is value that determines what round driver is. 
        // For each column or round I need separate array
        let roundOneContestants = entries.filter(obj => obj.ring_round == 0)
        let roundTwoContestants = entries.filter(obj => obj.ring_round == 1)
        let roundThreeContestants = entries.filter(obj => obj.ring_round == 2)
        let roundFourContestants = entries.filter(obj => obj.ring_round == 3)
        let roundFiveContestants = entries.filter(obj => obj.ring_round == 4)
        let roundSixContestants = entries.filter(obj => obj.ring_round == 5)

        // Filter first round participant array
        //let test = entries.filter(obj => obj.ring_round == 0)
        //Make empty array with first round participant size so that we can make the shape for the thing
        let prettyEntries = Array.apply(null, Array(roundOneContestants.length));

        let nearestP2 = 2**(Math.ceil(Math.log2(roundOneContestants.length)))

        this.Height = Array.apply(null, Array(2*nearestP2 - 1))
        this.Depth = Math.log2(nearestP2) + 1;

        var r1 = nearestP2; 
        var r2 = r1 / 2; 
        var r3 = r2 / 2; 
        var r4 = r3 / 2; 
        var r5 = r4 / 2; 
        var r6 = r5 / 2; 
        
        let roundOne = Array.apply(null, {length: r1}).map(Number.call, Number);
        let roundTwo = Array.apply(null, {length: r2}).map(Number.call, Number);
        let roundThree = Array.apply(null, {length: r3}).map(Number.call, Number);
        let roundFour = Array.apply(null, {length: r4}).map(Number.call, Number);
        let roundFive = Array.apply(null, {length: r5}).map(Number.call, Number);
        let roundSix = Array.apply(null, {length: r6}).map(Number.call, Number);
   
        for (let i = 0;  i < roundOne.length; i++) {
            //console.log(roundOneTest.indexOf(roundOneTest[i]))
            for (let y = 0;  y < roundOneContestants.length; y++) {
                if (roundOne[i] == roundOneContestants[y].curPos) {
                    roundOne[i] = roundOneContestants[y]
                }
            }
        }

        for (let i = 0;  i < roundTwo.length; i++) {
            for (let y = 0;  y < roundTwoContestants.length; y++) {
                if (roundTwo[i] == roundTwoContestants[y].curPos) {
                    roundTwo[i] = roundTwoContestants[y]
                }
            }
        }

        for (let i = 0;  i < roundThree.length; i++) {
            //console.log(roundOneTest.indexOf(roundOneTest[i]))
            for (let y = 0;  y < roundThreeContestants.length; y++) {
                if (roundThree[i] == roundThreeContestants[y].curPos) {
                    roundThree[i] = roundThreeContestants[y]
                }
            }
        }

        for (let i = 0;  i < roundFour.length; i++) {
            //console.log(roundOneTest.indexOf(roundOneTest[i]))
            for (let y = 0;  y < roundFourContestants.length; y++) {
                if (roundFour[i] == roundFourContestants[y].curPos) {
                    roundFour[i] = roundFourContestants[y]
                }
            }
        }

        for (let i = 0;  i < roundFive.length; i++) {
            //console.log(roundOneTest.indexOf(roundOneTest[i]))
            for (let y = 0;  y < roundFiveContestants.length; y++) {
                if (roundFive[i] == roundFiveContestants[y].curPos) {
                    roundFive[i] = roundFiveContestants[y]
                }
            }
        }

        
        
        // make a filled list of Entries with BYEs
        //let prettyEntries = deepCopy(entries);
        for (let i = prettyEntries.length; i < nearestP2; i++) {
            prettyEntries.push(new Entry(BYE));
        }

        // add in TBDs to prettyEntries
        for (let i = 1; i < prettyEntries.length; i++) {
            if (i % 2 == 1) {
                prettyEntries.splice(i, 0, new Entry(TBD));
            }
        }


        this.PrettyEntries = prettyEntries;
        this.roundOneContestants = roundOneContestants;
        this.roundTwoContestants = roundTwoContestants;
        this.roundThreeContestants = roundThreeContestants;
        this.roundFourContestants = roundFourContestants;
        this.roundFiveContestants = roundFiveContestants;

        this.roundOne = roundOne;
        this.roundTwo = roundTwo;
        this.roundThree = roundThree;
        this.roundFour = roundFour;
        this.roundFive = roundFive;
        
        // fill initial bracket
        this.makeBracket();
    }


    makeBracket() {
        // make be-rows and insert PrettyEntries
        for (let i = 0; i < this.Height.length; i++) {
            
            // BEE row
            let bEERowElement = document.createElement("div");
            bEERowElement.id = ID_BE_ROW + i;
            bEERowElement.className = CLASS_BE_ROW;
            bEERowElement.style.width = 100 + "%";

            // BEE
            let bEE = document.createElement("div");
            bEE.className = CLASS_BE;
            bEE.style.width = 80 / this.Depth + "%";

            //      BEE NAME
            let bEENameElement = document.createElement("div");
            bEENameElement.className = CLASS_BE_NAME + " " + CLASS_VERDANA_GRAY;
            bEE.appendChild(bEENameElement);
            

            // APPEND ELEMENTS
            bEE.appendChild(bEENameElement);
            bEERowElement.appendChild(bEE);
            _B_Element.appendChild(bEERowElement);
            _B_Row_Elements.push(bEERowElement);
        }



        // offset entries to make the bracket shape
        // Go through oddly indexed powers of two that are less than the length of PrettyEntries
        //  2, 4, 8, ...
        // (2, 4, 6, ...), (4, 8, 12, ...), (8, 16, 24, ...), ...
        // Getting powers of two is easy so use (i-1)

        for(let i = 2; i < this.PrettyEntries.length; i *= 2) {
            for (let ei = i; ei < this.PrettyEntries.length; ei+=i) {
                let spacerE = document.createElement("div");
                spacerE.style.width = 100 / this.Depth + "%";                
                _B_Row_Elements[ei-1].prepend(spacerE);
            }
        }

        const chunk = (arr, size) =>
          Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
          );
        // advance any entries that have BYEs first round. also adds advance arrows to entries
        // Check all even indexes if they are BYEs
        //for (let y = 0; y < this.roundOne.length; y++) {
       
        let y = 0;    
        let firstColumn = [];
        let secondColumn = [];
        let thirdColumn = [];
        let forthColumn = [];
        let fifthColumn = [];

        for (let i = 0; i < this.Height.length; i+=2) {
            firstColumn.push(_B_Row_Elements[i])

            _B_Row_Elements[i].lastChild.className = "be berr";

            for (y; y < this.roundOne.length; y++) { 
                let winnerName = this.roundOne[y++].racer;
                let winnerE = _B_Row_Elements[i].lastChild;

                winnerE.id = ID_BE + winnerName;
                winnerE.lastChild.style.visibility = "visible";


                if (winnerName == undefined) {
                     winnerE.innerText = "BYE";
                     winnerE.style.backgroundColor = "#dddddd"
                } else {
                     winnerE.innerText = winnerName;
                }
                break;
            }

        }

        let chunkFirstColumn = chunk(firstColumn, 2);
        for (var i = chunkFirstColumn.length - 1; i >= 0; i--) {
            chunkFirstColumn[i][0].lastChild.className = "be berr be1";
            if (chunkFirstColumn[i][1] === undefined) {
                console.log("error")
            } else {
                chunkFirstColumn[i][1].lastChild.className = "be berr be2";
            }

        }




        let x = 0;
        for (let i = 1; i < this.Height.length; i+=4) {
            secondColumn.push(_B_Row_Elements[i])
            for (x; x < this.roundTwo.length; x++) { 
                let winnerName = this.roundTwo[x++].racer;
                let winnerE = _B_Row_Elements[i].lastChild;
                winnerE.id = ID_BE + winnerName;
                winnerE.lastChild.style.visibility = "visible";

                if (winnerName == undefined) {
                     winnerE.innerText = "BYE";
                     winnerE.style.backgroundColor = "#dddddd"
                } else {
                     winnerE.innerText = winnerName;
                }
                break;
            }
        }

        let chunkSecondColumn = chunk(secondColumn, 2);
        for (var i = chunkSecondColumn.length - 1; i >= 0; i--) {
            chunkSecondColumn[i][0].lastChild.className = "be  beSecondColumn";

            if (chunkSecondColumn[i][1] === undefined) {
                console.log("error")
            } else {
                chunkSecondColumn[i][1].lastChild.className = "be be2";
            }
        }

        let q = 0;
        for (let i = 3; i < this.Height.length; i+=8) {
            thirdColumn.push(_B_Row_Elements[i])
            for (q; q < this.roundThree.length; q++) { 
                //console.log(this.roundOne[y++])
                let winnerName = this.roundThree[q++].racer;
                let winnerE = _B_Row_Elements[i].lastChild;
                winnerE.id = ID_BE + winnerName;
                winnerE.lastChild.style.visibility = "visible";
                if (winnerName == undefined) {
                     winnerE.innerText = "BYE";
                     winnerE.style.backgroundColor = "#dddddd"
                } else {
                     winnerE.innerText = winnerName;
                }
                break;
            }
        }

        let chunkThirdColumn = chunk(thirdColumn, 2);
        for (var i = chunkThirdColumn.length - 1; i >= 0; i--) {
            chunkThirdColumn[i][0].lastChild.className = "be  beThirdColumn";
            
            if ( chunkThirdColumn[i][1] === undefined) {
                console.log("error")
            } else {
                chunkThirdColumn[i][1].lastChild.className = "be be2";
            }

        }


        let w = 0;
        for (let i = 7; i < this.Height.length; i+=16) {
            forthColumn.push(_B_Row_Elements[i])
            for (w; w < this.roundFour.length; w++) { 
                //console.log(this.roundOne[y++])
                let winnerName = this.roundFour[w++].racer;
                let winnerE = _B_Row_Elements[i].lastChild;
                winnerE.id = ID_BE + winnerName;
                winnerE.lastChild.style.visibility = "visible";
                if (winnerName == undefined) {
                     winnerE.innerText = "BYE";
                     winnerE.style.backgroundColor = "#dddddd"
                } else {
                     winnerE.innerText = winnerName;
                }
                break;
            }
        }

        let chunkForthColumn = chunk(forthColumn, 2);
        for (var i = chunkForthColumn.length - 1; i >= 0; i--) {
            chunkForthColumn[i][0].lastChild.className = "be  beForthColumn";
            if (chunkForthColumn[i][1] === undefined) {
                console.log("error")
            } else {
                chunkForthColumn[i][1].lastChild.className = "be be2";
            }
        }



        let r = 0;
        for (let i = 15; i < this.Height.length; i+=32) {
            fifthColumn.push(_B_Row_Elements[i])
            for (r; r < this.roundFive.length; r++) { 
                //console.log(this.roundOne[y++])
                let winnerName = this.roundFive[r++].racer;
                let winnerE = _B_Row_Elements[i].lastChild;
                winnerE.id = ID_BE + winnerName;
                winnerE.lastChild.style.visibility = "visible";
                if (winnerName == undefined) {
                     winnerE.innerText = "BYE";
                     winnerE.style.backgroundColor = "#dddddd"
                } else {
                     winnerE.innerText = winnerName;
                }
                break;
            }
        }

        let chunkFifthColumn = chunk(fifthColumn, 2);
        for (var i = chunkFifthColumn.length - 1; i >= 0; i--) {
            chunkFifthColumn[i][0].lastChild.className = "be beFifthColumn";
            
            if ( chunkFifthColumn[i][1] === undefined) {
                console.log("error")
            } else {
                chunkFifthColumn[i][1].lastChild.className = "be be2";
            }
        }

        let arrayLength = this.Height.length + 1;
        let removeItemClass = _B_Row_Elements[arrayLength / 2 - 1];
        removeItemClass.lastChild.className = "be ber";
    }
}
