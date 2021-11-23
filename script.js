//Get quotes from api - https://type.fit/api/quotes
let quoteContainer = document.getElementById("quote-container");
let quoteText = document.getElementById("quote");
let authorText = document.getElementById("author");
let twitterBtn = document.getElementById("twitter");
let newQuoteBtn = document.getElementById("new-quote");
let loader = document.getElementById("loader");

let apiQuotes = [];

//Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loader
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new quote
function newQuote() {
    loading();
    //Pick a random quotes from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //console.log(quotes);
    if (!quote.author) {
        authorText.textContent = "Unknown"
    } else {
        authorText.textContent = quote.author;
    }

    //Check quote length
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    //Set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        //response will not be populated with undefined or null, unless data is fetched from the api.
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //Handle the errors here.
    }
}

//Tweet our quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)

//On Load, run when the page loads.
getQuotes();