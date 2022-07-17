/*===========================*/
/*====== EntriesList ========*/
/*===========================*/

class EntriesList {
    constructor($eventID, $classID) {
        this.eventID = $eventID;
        this.classID = $classID;
        this.Entries = [];
    }

    
    addEntry() {
        const request = ( url, params = {}, method = 'GET' ) => {
            let options = {
                method
            };
            if ( 'GET' === method ) {
                url += '?' + ( new URLSearchParams( params ) ).toString();
            } else {
                options.body = JSON.stringify( params );
            }
            
            return fetch( url, options ).then( response => response.json() );
        };
        const get = ( url, params ) => request( url, params, 'GET' );
        const post = ( url, params ) => request( url, params, 'POST' );

        get('http://localhost/api/results', { eventID: this.eventID, classID: this.classID})

            .then(data => {
                for(let driver of data.data) {
                    this.Entries.push(driver);
                }

                for(let classes of data.classes) {
                    let newEntryElement = document.createElement("div");
                    newEntryElement.className = CLASS_EL_ROW;
                    // Add name to newEntryElement
                    let newEntryElementName = document.createElement("a");
                    newEntryElementName.innerText = "Class: " + classes.className;
                    newEntryElementName.className = CLASS_EL_NAME + " " + CLASS_VERDANA_GRAY;
                    newEntryElementName.href = route('bracket', [ data.eventID, classes.classID]);
                    newEntryElement.appendChild(newEntryElementName);

                    // Add newEntryElement to EntryListElement
                    _E_List_Element.appendChild(newEntryElement);
                }
               
                     _B_Element.innerText = "";
                     _B_Row_Elements = [];

                     // Making the Bracket takes care of filling the initial BYEs and TBDs
                     // also takes care of offsetting the DOM TBDs
                     
                     new Bracket(_E_List.Entries);
            });
    
    
    }
}