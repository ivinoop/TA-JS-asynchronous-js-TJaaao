let url = 'https://api.spaceflightnewsapi.net/v3/articles?_limit=30';

let newsList = document.querySelector('.news-list');
let select = document.querySelector('select');
let main = document.querySelector('.main');
let errorMessage = document.querySelector('.error-message');

let allNews = [];

function handleErrorMessage(message = 'Something went wrong') {
  main.style.display = 'none';
  errorMessage.style.display = 'block';
  errorMessage.innerText = message;
}

function displayLoader() {
  let div = document.createElement('div');
  let loader = document.createElement('img');
  loader.src = './img/loader.gif';
  div.classList.add('loader');
  div.append(loader);
  newsList.prepend(div);
}

displayLoader();

function renderNews(news) {
  newsList.innerHTML = '';
  news.forEach((newsItem) => {
  let newsBox = document.createElement('li');
  let textBox = document.createElement('div');
  let newsImage = document.createElement('img');
  let newsSite = document.createElement('span');
  let newsHeading = document.createElement('h3');
  let newsSummary = document.createElement('p');
  let readBtn = document.createElement('a');

  newsBox.classList.add('news-box', 'flex', 'jcc', 'aic');
  textBox.classList.add('text-box', 'flex', 'aifs', 'column');
  newsImage.src = newsItem.imageUrl;
  newsSite.innerText = newsItem.newsSite;
  newsHeading.innerText = newsItem.title;
  newsSummary.innerText = newsItem.summary;
  readBtn.innerText = 'Read More'
  readBtn.href = newsItem.url;
  readBtn.target = "_blank";

  textBox.append(newsSite, newsHeading, newsSummary, readBtn);
  newsBox.append(newsImage,textBox);
  newsList.append(newsBox); 
  })
}

function displayOptions(sources) {
  sources.forEach(source => {
    let option = document.createElement('option');
    option.innerText = source;
    option.value = source;
    select.append(option)
  })
}

function init() {
  fetch(url)
  .then((response) => {
    if(response.ok) {
      return response.json();
    } else {
      throw new Error('Response Not Ok');
    }
  })
  .then((news) => {
    allNews = news;
    renderNews(news);
    let allSources = Array.from(new Set(news.map(n => n.newsSite)));
    displayOptions(allSources);
  })
  .catch(error => {
    handleErrorMessage(error);
  })
  .finally(() => {
    displayLoader();
  });
}


select.addEventListener('change', (event) => {
  let source = event.target.value.trim();
  let filteredNews;
  if(source) {
    filteredNews = allNews.filter(news => news.newsSite === source);
  } else {
    filteredNews = allNews;
  }
  renderNews(filteredNews);
});

if(navigator.onLine) {
  init();
} else {
  handleErrorMessage('Check your internet connection ⚠️');
}