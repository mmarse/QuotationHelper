var getAndDisplayQuotations = function() {    // this is a lambda function meant to be called after the js file requested is loaded
    var speakersInRound = document.getElementById("numOfSpeakers").value;
    var numQuotationsEachSlip = document.getElementById("numOfQuotationsEachSlip").value;
    var numberNeeded = speakersInRound * numQuotationsEachSlip;
    var retrievedQuotations = getSet(numberNeeded);
    var speakerNumber = 1;
    var setNumber = 0;
    var currentQuoteNumber = 1;

    var text = "";
    text = document.getElementById("tournamentName").value;
    text += "<p>"
    while (speakerNumber <= speakersInRound) {  //one whole round
        text += "<p>Speaker " + speakerNumber + "</p>";
        while ( currentQuoteNumber <= numQuotationsEachSlip) {   //one slip
            text += currentQuoteNumber + ". " + retrievedQuotations[setNumber] + "<br>";
            currentQuoteNumber++;
            setNumber++;
        }
    speakerNumber++;
    currentQuoteNumber = 1;
    }
    document.getElementById("quotations").innerHTML = text;
    document.getElementById("printButton").style += "block"; // make the print button available after slips load
};

function loadQuotations(tournamentName, pool) {
    var datafile = "";
    if (pool === "englishProverbs") {  //try to load the proverbs if they are selected, this may become a switch, add new files here
        var datafile = "Proverbs.js";
    }
    loadScript(datafile, getAndDisplayQuotations);
}

function getSet(numberNeeded) {
    var set = arrayOfQuotations;
    var quotesSelected = []
    var quotesAdded = 0;
    var quoteNumber = 0;
    while (quotesAdded <= numberNeeded) {
        quoteNumber = Math.floor(Math.random() * set.length); //get a random element of the set as a number
        quotesSelected.push(set[quoteNumber]);  // push that new quotations into our new array
        set.splice(quoteNumber, 1);  //remove that quotation from our temporary array
        quotesAdded++;
    }
    return quotesSelected;
}

function printThis(divName) {
    if (document.getElementById(divName).childNodes.length === 0) {
        alert("Nothing to print!");
        return;
    }
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}

function loadScript(datafile, callback)
{
    var head = document.getElementsByTagName('head')[0];     // Adding the script tag to the head
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = datafile;
    script.onreadystatechange = callback;       // Call the lambda function before it's done.
    script.onload = callback;                   // There are two events for cross browser compatibility.
    head.appendChild(script);                   // Then we load the script.
}

