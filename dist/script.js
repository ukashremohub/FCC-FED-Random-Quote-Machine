const projectName = 'random-quote-machine';
let quotesData;

var colors = [
'#ff6666',
'#ff0000',
'#ff4000',
'#ff8000',
'#ffbf00',
'#ffff00',
'#FB6964',
'#bfff00',
'#80ff00',
'#00bfff',
'#0000ff',
'#ff00bf'];

var currentQuote = '',
currentAuthor = '';

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json' },

    url:
    'https://gist.githubusercontent.com/ukashremohub/be6112d0964f5527c3c0bb67eeda83d3/raw/95c2d727addafa1bfe226c6127c7841f03ef637e/ukashQuotes.json',
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
        console.log('quotesData');
        console.log(quotesData);
      }
    } });

}

function getRandomQuote() {
  return quotesData.quotes[
  Math.floor(Math.random() * quotesData.quotes.length)];

}

function getQuote() {
  let randomQuote = getRandomQuote();

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

  $('#tweet-quote').attr(
  'href',
  'https://twitter.com/intent/tweet?hashtags=quotes&related=text=' +
  encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));


  $('.quote-text').animate({ opacity: 0 }, 200, function () {
    $(this).animate({ opacity: 1 }, 200);
    $('#text').text(randomQuote.quote);
  });

  $('.quote-author').animate({ opacity: 0 }, 200, function () {
    $(this).animate({ opacity: 1 }, 200);
    $('#author').html(randomQuote.author);
  });

  var color = Math.floor(Math.random() * colors.length);
  $('html body').animate(
  {
    backgroundColor: colors[color],
    color: colors[color] },

  500);

  $('.button').animate(
  {
    backgroundColor: colors[color] },

  500);

}

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $('#new-quote').on('click', getQuote);
});