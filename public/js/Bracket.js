class Bracket {

    constructor(data) {
        // Saad muuta neid. Ajavõtt arvestab võidu ära ja postib ära... aga winoverride või STG rule joone ületus. Kuidagi peaks saama seda muuta...
        // Saab baasist ülekirjutada round 4
        // Update ... else insert .. Query insert.. 

        // Kuidagi query öelda, et lvier results ID kvuab et muuta.. mingi general conf leht kus saab dynaamiliselt võtta seda eventID


        // 1. Create Event leht. Saad teha eventi aga ainult 1 saab olla aktiivne. See peab olema ka API mille URLI saab pärast hakata live/index.php (live.edra.ee) queryba. query peaks toimima selliselt, et kui backendis
        // muudad ühe eventi aktiivseks siis nende tulemusi ta näitab live edra ee's

        // 2. Peaks tegema sellise ägeda fix lehe kus on pm text field ja sinna saad panna query mida siis executetakse baasis. 

        //Update if exists tabelisse lisamise..  

        let firstRoundContestants = data.filter(obj => obj.ring_round == 0)
        let secondRoundContestants = data.filter(obj => obj.ring_round == 1)
        let thirdRoundContestants = data.filter(obj => obj.ring_round == 2)
        let fourthRoundContestants = data.filter(obj => obj.ring_round == 3)
        let fifthRoundContestants = data.filter(obj => obj.ring_round == 4)
        let sixthRoundContestants = data.filter(obj => obj.ring_round == 5)

        // Filter first round participant array
        //Make empty array with first round participant size so that we can make the shape for the thing
        let emptyFirstRoundContestantsArray = Array.apply(null, Array(firstRoundContestants.length));
        let nearestP2 = 2**(Math.ceil(Math.log2(emptyFirstRoundContestantsArray.length)))
        let height = Array.apply(null, Array(2*nearestP2 - 1))
        let depth = Math.log2(nearestP2) + 1;

        let firstRoundColumnArrayLength = nearestP2; 
        let secondRoundColumnArrayLength = firstRoundColumnArrayLength / 2; 
        let thirdRoundColumnArrayLength = secondRoundColumnArrayLength / 2; 
        let fourthRoundColumnArrayLength = thirdRoundColumnArrayLength / 2; 
        let fifthRoundColumnArrayLength = fourthRoundColumnArrayLength / 2; 
        let sixthRoundColumnArrayLength = fifthRoundColumnArrayLength / 2; 

        let firstRoundColumnLength = Array.apply(null, {length: firstRoundColumnArrayLength}).map(Number.call, Number);
        let secondRoundColumnLength = Array.apply(null, {length: secondRoundColumnArrayLength}).map(Number.call, Number);
        let thirdRoundColumnLength = Array.apply(null, {length: thirdRoundColumnArrayLength}).map(Number.call, Number);
        let fourthRoundColumnLength = Array.apply(null, {length: fourthRoundColumnArrayLength}).map(Number.call, Number);
        let fifthRoundColumnLength = Array.apply(null, {length: fifthRoundColumnArrayLength}).map(Number.call, Number);
        let sixthRoundColumnLength = Array.apply(null, {length: sixthRoundColumnArrayLength}).map(Number.call, Number);

        let bracketFirstRoundColumn = [];
        let bracketSecondRoundColumn = [];
        let bracketThirdRoundColumn = [];
        let bracketFourthRoundColumn = [];
        let bracketFifthRoundColumn = [];
        let bracketSixthRoundColumn = [];

        for (let i = emptyFirstRoundContestantsArray.length; i < nearestP2; i++) {
            emptyFirstRoundContestantsArray.push(new Entry(BYE));
        }

        // add in TBDs to prettyEntries
        for (let i = 1; i < emptyFirstRoundContestantsArray.length; i++) {
            if (i % 2 == 1) {
                emptyFirstRoundContestantsArray.splice(i, 0, new Entry(TBD));
            }
        }
        const chunkArray = (arr, size) =>
            Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        );

        this.chunkArray = chunkArray;

        this.emptyFirstRoundContestantsArray    = emptyFirstRoundContestantsArray;

        this.bracketFirstRoundColumn    = bracketFirstRoundColumn;
        this.bracketSecondRoundColumn   = bracketSecondRoundColumn;
        this.bracketThirdRoundColumn    = bracketThirdRoundColumn;
        this.bracketFourthRoundColumn   = bracketFourthRoundColumn;
        this.bracketFifthRoundColumn    = bracketFifthRoundColumn;
        this.bracketSixthRoundColumn    = bracketSixthRoundColumn;

        this.firstRoundContestants  = firstRoundContestants;
        this.secondRoundContestants = secondRoundContestants;
        this.thirdRoundContestants  = thirdRoundContestants;
        this.fourthRoundContestants = fourthRoundContestants;
        this.fifthRoundContestants  = fifthRoundContestants;
        this.sixthRoundContestants  = sixthRoundContestants;

        this.firstRoundColumnLength     = firstRoundColumnLength;
        this.secondRoundColumnLength    = secondRoundColumnLength;
        this.thirdRoundColumnLength     = thirdRoundColumnLength;
        this.fourthRoundColumnLength    = fourthRoundColumnLength;
        this.fifthRoundColumnLength     = fifthRoundColumnLength;
        this.sixthRoundColumnLength     = sixthRoundColumnLength;

        this.Height = height;
        this.Depth  = depth;

        for (let i = 0;  i < firstRoundColumnLength.length; i++) {
            for (let y = 0;  y < firstRoundContestants.length; y++) {
                if (firstRoundColumnLength[i] == firstRoundContestants[y].curPos) {
                    firstRoundColumnLength[i] = firstRoundContestants[y]
                }
            }
        }

        for (let i = 0;  i < secondRoundColumnLength.length; i++) {
            for (let y = 0;  y < secondRoundContestants.length; y++) {
                if (secondRoundColumnLength[i] == secondRoundContestants[y].curPos) {
                    secondRoundColumnLength[i] = secondRoundContestants[y]
                }
            }
        }

        for (let i = 0;  i < thirdRoundColumnLength.length; i++) {
            for (let y = 0;  y < thirdRoundContestants.length; y++) {
                if (thirdRoundColumnLength[i] == thirdRoundContestants[y].curPos) {
                    thirdRoundColumnLength[i] = thirdRoundContestants[y]
                }
            }
        }

        for (let i = 0;  i < fourthRoundColumnLength.length; i++) {
            for (let y = 0;  y < fourthRoundContestants.length; y++) {
                if (fourthRoundColumnLength[i] == fourthRoundContestants[y].curPos) {
                    fourthRoundColumnLength[i] = fourthRoundContestants[y]
                }
            }
        }

        for (let i = 0;  i < fifthRoundColumnLength.length; i++) {
            for (let y = 0;  y < fifthRoundContestants.length; y++) {
                if (fifthRoundColumnLength[i] == fifthRoundContestants[y].curPos) {
                    fifthRoundColumnLength[i] = fifthRoundContestants[y]
                }
            }
        }

        for (let i = 0;  i < sixthRoundColumnLength.length; i++) {
            for (let y = 0;  y < sixthRoundContestants.length; y++) {
                if (sixthRoundColumnLength[i] == sixthRoundContestants[y].curPos) {
                    sixthRoundColumnLength[i] = sixthRoundContestants[y]
                }
            }
        }

        
        // fill initial bracket
        this.makeBracket();
    }


    makeBracket() {
        // make be-rows and insert PrettyEntries
        for (let i = 0; i < this.Height.length; i++) {
            // BEE row
            let bEERowElement = document.createElement("div");
            //bEERowElement.id = ID_BE_ROW + i;
            bEERowElement.id = i;
            bEERowElement.className = CLASS_BE_ROW;
            bEERowElement.style.width = 100 + "%";

            // BEE
            let bEE = document.createElement("div");
            bEE.className = CLASS_BE;
            bEE.style.width = 80 / this.Depth + "%";

            // BEE NAME
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

        for(let i = 2; i < this.emptyFirstRoundContestantsArray.length; i *= 2) {
            for (let ei = i; ei < this.emptyFirstRoundContestantsArray.length; ei+=i) {
                let spacerE = document.createElement("div");
                spacerE.style.width = 100 / this.Depth + "%";                
                _B_Row_Elements[ei-1].prepend(spacerE);
            }
        }

        //firstRound
        let columnIndex = 0;
        for (let i = 0; i < this.Height.length; i+=2) 
        {
            this.bracketFirstRoundColumn.push(_B_Row_Elements[i])
            _B_Row_Elements[i].lastChild.className = "be berr";

            for (columnIndex; columnIndex < this.firstRoundColumnLength.length; columnIndex++) { 
                let winnerName = this.firstRoundColumnLength[columnIndex++].racer;
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

        let chunkFirstRoundColumn = this.chunkArray(this.bracketFirstRoundColumn, 2);

        for (var i = chunkFirstRoundColumn.length - 1; i >= 0; i--) 
        {
            chunkFirstRoundColumn[i][0].lastChild.className = "be berr beFirstColumn";
            if (chunkFirstRoundColumn[i][1] === undefined) {
                console.log("First round error")
            } else {
                chunkFirstRoundColumn[i][1].lastChild.className = "be berr be2";
            }
        }
        //endFirstRound


        let secondColumnIndex = 0;
        //second column
        for (let i = 1; i < this.Height.length; i+=4) {
            this.bracketSecondRoundColumn.push(_B_Row_Elements[i])

            for (secondColumnIndex; secondColumnIndex < this.secondRoundColumnLength.length; secondColumnIndex++) { 
                let winnerName = this.secondRoundColumnLength[secondColumnIndex++].racer;
                let winnerE = _B_Row_Elements[i].lastChild;
                winnerE.id = ID_BE + winnerName;
                winnerE.lastChild.style.visibility = "visible";

                if (winnerName == undefined) 
                {
                     winnerE.innerText = "BYE";
                     winnerE.style.backgroundColor = "#dddddd"
                } else {
                     winnerE.innerText = winnerName;
                }
                break;
            }
        }

        let chunkSecondRoundColumn = this.chunkArray(this.bracketSecondRoundColumn, 2);
        for (var i = chunkSecondRoundColumn.length - 1; i >= 0; i--) 
        {
            chunkSecondRoundColumn[i][0].lastChild.className = "be  beSecondColumn";
            if (chunkSecondRoundColumn[i][1] === undefined) 
            {
                console.log("Second round error")
            } else {
                chunkSecondRoundColumn[i][1].lastChild.className = "be be2";
            }
        }//end of second column


        //Third column
        let thirdColumnIndex = 0;
        for (let i = 3; i < this.Height.length; i+=8) 
        {
            this.bracketThirdRoundColumn.push(_B_Row_Elements[i])

            for (thirdColumnIndex; thirdColumnIndex < this.thirdRoundColumnLength.length; thirdColumnIndex++) 
            { 
                let winnerName = this.thirdRoundColumnLength[thirdColumnIndex++].racer;
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

        let chunkThirdRoundColumn = this.chunkArray(this.bracketThirdRoundColumn, 2);

        for (var i = chunkThirdRoundColumn.length - 1; i >= 0; i--) 
        {
            chunkThirdRoundColumn[i][0].lastChild.className = "be  beThirdColumn";
            
            if (chunkThirdRoundColumn[i][1] === undefined) {
                console.log("Third column error")
            } else {
                chunkThirdRoundColumn[i][1].lastChild.className = "be be2";
            }
        }//end third column



        //fourthColumn
        let fourthColumnIndex = 0;
        for (let i = 7; i < this.Height.length; i+=16) 
        {
            this.bracketFourthRoundColumn.push(_B_Row_Elements[i])

            for (fourthColumnIndex; fourthColumnIndex < this.fourthRoundColumnLength.length; fourthColumnIndex++) 
            { 
                //console.log(this.roundOne[y++])
                let winnerName = this.fourthRoundColumnLength[fourthColumnIndex++].racer;
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

        let chunkForthColumn = this.chunkArray(this.bracketFourthRoundColumn, 2);

        for (var i = chunkForthColumn.length - 1; i >= 0; i--) {
            chunkForthColumn[i][0].lastChild.className = "be  beForthColumn";
            if (chunkForthColumn[i][1] === undefined) {
                console.log("forth column error")
            } else {
                chunkForthColumn[i][1].lastChild.className = "be be2";
            }
        }//endFourthColumn


        //fifthRound
        let fifthColumnIndex = 0;
        for (let i = 15; i < this.Height.length; i+=32) 
        {
            this.bracketFifthRoundColumn.push(_B_Row_Elements[i])
            for (fifthColumnIndex; fifthColumnIndex < this.fifthRoundColumnLength.length; fifthColumnIndex++) 
            { 
                let winnerName = this.fifthRoundColumnLength[fifthColumnIndex++].racer;
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

        let chunkFifthColumn = this.chunkArray(this.bracketFifthRoundColumn, 2);
        for (var i = chunkFifthColumn.length - 1; i >= 0; i--) 
        {
            chunkFifthColumn[i][0].lastChild.className = "be beFifthColumn";
            
            if ( chunkFifthColumn[i][1] === undefined) {
                console.log("fifth round error")
            } else {
                chunkFifthColumn[i][1].lastChild.className = "be be2";
            }
        }//end fifth round

        //sixthRound
        let sixthColumnIndex = 0;
        for (let i = 31; i < this.Height.length; i+=64) 
        {
            this.bracketSixthRoundColumn.push(_B_Row_Elements[i])
            for (sixthColumnIndex; sixthColumnIndex < this.sixthRoundColumnLength.length; sixthColumnIndex++) 
            { 
                let winnerName = this.sixthRoundColumnLength[sixthColumnIndex++].racer;
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

        let chunkSixthColumn = this.chunkArray(this.bracketSixthRoundColumn, 2);
        for (var i = chunkSixthColumn.length - 1; i >= 0; i--) 
        {
            //TODO. Since I dont have tests for 7th round data.. might get broken
            chunkSixthColumn[i][0].lastChild.className = "be beFifthColumn";
            
            if ( chunkSixthColumn[i][1] === undefined) {
                console.log("fifth round error")
            } else {
                chunkSixthColumn[i][1].lastChild.className = "be be2";
            }
        }//end sixth round


        let arrayLength = this.Height.length + 1;
        let removeItemClass = _B_Row_Elements[arrayLength / 2 - 1];
        removeItemClass.lastChild.className = "be ber";


        for (let i = 0; i < this.Height.length; i+=2) //current column (column 3)
        {
            //if next column does not exist then paint current column value green(since this is the event winner)
            if (this.Height.length <=2) {
                _B_Row_Elements[i].lastChild.style.backgroundColor = "green"
            }

            //if next column does exist then check for that column value, compare and paint current column value green
            for (let p = 1; p < this.Height.length; p+=4) {//next column
                //if previous column value equals current column value (previous column value is winner) then make it green
                if (_B_Row_Elements[i].lastChild.innerText == _B_Row_Elements[p].lastChild.innerText) {
                    _B_Row_Elements[i].lastChild.style.backgroundColor = "green"
                }
            }
        }

        for (let i = 1; i < this.Height.length; i+=4) //current column (column 3)
        {
            //if next column does not exist then paint current column value green(since this is the event winner)
            if (this.Height.length <=4) {
                _B_Row_Elements[i].lastChild.style.backgroundColor = "green"
            }

            //if next column does exist then check for that column value, compare and paint current column value green
            for (let p = 3; p < this.Height.length; p+=8) {//next column
                //if previous column value equals current column value (previous column value is winner) then make it green
                if (_B_Row_Elements[i].lastChild.innerText == _B_Row_Elements[p].lastChild.innerText) {
                    _B_Row_Elements[i].lastChild.style.backgroundColor = "green"
                }
            }
        }


        for (let i = 3; i < this.Height.length; i+=8) //current column (column 3)
        {
            //if next column does not exist then paint current column value green(since this is the event winner)
            if (this.Height.length <=8) {
                _B_Row_Elements[i].lastChild.style.backgroundColor = "green"
            }

            //if next column does exist then check for that column value, compare and paint current column value green
            for (let p = 7; p < this.Height.length; p+=16) {//next column
                //if previous column value equals current column value (previous column value is winner) then make it green
                if (_B_Row_Elements[i].lastChild.innerText == _B_Row_Elements[p].lastChild.innerText) {
                    _B_Row_Elements[i].lastChild.style.backgroundColor = "green"
                }
            }
        }


        for (let i = 7; i < this.Height.length; i+=16) //current column
        {

            if (this.Height.length <=16) {
                _B_Row_Elements[i].lastChild.style.backgroundColor = "green"
            }

            for (let p = 15; p < this.Height.length; p+=32) {//next column
                //if previous column value equals current column value (previous column value is winner) then make it green
                if (_B_Row_Elements[i].lastChild.innerText == _B_Row_Elements[p].lastChild.innerText) {
                    _B_Row_Elements[i].lastChild.style.backgroundColor = "green"
                }
            }
        }


        for (let i = 15; i < this.Height.length; i+=32) //current column
        {

            if (this.Height.length <=32) {
                _B_Row_Elements[i].lastChild.style.backgroundColor = "green"
            }

            for (let p = 31; p < this.Height.length; p+=64) {//next column
                //if previous column value equals current column value (previous column value is winner) then make it green
                if (_B_Row_Elements[i].lastChild.innerText == _B_Row_Elements[p].lastChild.innerText) {
                    _B_Row_Elements[i].lastChild.style.backgroundColor = "green"
                }
            }
        }


    }
}
