let url = 'https://api.spaceflightnewsapi.net/v3/articles?_limit=30';

let newsList = document.querySelector('.news-list');
let select = document.querySelector('select');

let allNews = [];

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

fetch(url)
.then((resolve) => resolve.json())
.then((news) => {
  allNews = news;
  renderNews(news);
  let allSources = Array.from(new Set(news.map(n => n.newsSite)));
  displayOptions(allSources);
});

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