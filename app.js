import quotes from './quotes.js';

const quotesByCategory = quotes.filter(quote => {
  return quote.categoty === 'Страх';
});

const quotesSection = document.querySelector('.quotes-section');

for (let i = 0; i < quotesByCategory.length; i++) {
  const quoteHtml = `<blockquote class="quote">
    ${quotesByCategory[i].quote}
    <footer class="autor"> - ${quotesByCategory[i].author}</footer>
  </blockquote>`
  
  quotesSection.innerHTML += quoteHtml;
}