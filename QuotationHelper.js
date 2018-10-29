// QuotationHelper functions v0.01


function getCategories() {
    let categories = [];
    quotationBase.forEach(element => {  // if the category isn't already used, add it to the options
        if (categories.includes(element[0]) == false) {
            categories.push(element[0]);
        }
    });
    let text = ""; // create the load categories select element
    text = text + "<select name=\"quotationCategories\" id=\"quotationCategories\">";
    categories.forEach(element => {
        text = text + "<option value='" + element + "'>" + element + "</option>";
    });
    document.getElementById("categories").innerHTML = text; // load the categories select element to the page
    document.getElementById("numberQuestions").style += "block";  // make the "number questions" area visible
    document.getElementById("loadQuotationsButton").style += "block";  // make the "load quotations" button visible
    document.getElementById("clearQuotationArea").style += "block";  // make the "clear quotations" button visible
    
}

function loadQuotations() {

    let selectedCategory = document.getElementById("quotationCategories").value;
    let quotationOptions = [];
    let text = "";

    quotationBase.forEach(element => { // load the quotations that match the selected category into an array
        if (element[0] == selectedCategory) {
        quotationOptions.push(element[2]);
        }
    });
    
    let speakersInRound = document.getElementById("numOfSpeakers").value;
    let numQuotationsEachSlip = document.getElementById("numOfQuotationsEachSlip").value;
    let numberNeeded = speakersInRound * numQuotationsEachSlip;
    let numPossibleText = "That category has a total of " + quotationOptions.length + " quotations.";
    numPossibleText = numPossibleText + "<br />You requested " + numberNeeded + " quotations.<br />";
    numPossibleText = numPossibleText + "Anything above that will be undefined.";
    numPossibleText = numPossibleText + "<br />To avoid quotations being repeated, you should choose a different category for each round<br />";

    let retrievedQuotations = getSet(numberNeeded, quotationOptions);

    document.getElementById("numberPossible").innerHTML = numPossibleText;
    document.getElementById("numberPossible").style += "block";  // make the "number possible" area visible

    displayQuotations(retrievedQuotations, speakersInRound, numQuotationsEachSlip);
};

function getSet(numberNeeded, arrayOfOptions) {
    let set = arrayOfOptions;
    let quotesSelected = []
    let quotesAdded = 0;
    let quoteNumber = 0;
    while (quotesAdded <= numberNeeded) {
        quoteNumber = Math.floor(Math.random() * set.length); //get a random element of the set as a number
        quotesSelected.push(set[quoteNumber]);  // push that new quotations into our new array
        set.splice(quoteNumber, 1);  //remove that quotation from our temporary array
        quotesAdded++;
    }
    return quotesSelected;
}

function displayQuotations(retrievedQuotations, speakersInRound, numQuotationsEachSlip) {
    let speakerNumber = 1;
    let setNumber = 0;
    let currentQuoteNumber = 1;

    let text = "";
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
}

function printThis(divName) {
    if (document.getElementById(divName).childNodes.length === 0) {
        alert("Nothing to print!");
        return;
    }
    let printContents = document.getElementById(divName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}

function clearThis(divName) {
    document.getElementById(divName).innerHTML = "";
}